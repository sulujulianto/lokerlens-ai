import { z } from "zod";
import {
  JobReadinessAnalysisSchema,
  type AnalyzeJobReadinessRequest,
  type JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import { AppError } from "../errors";
import { buildAnalysisPrompt } from "./promptBuilder";
import type { AIProvider } from "./provider";
import { parseJobReadinessResponse } from "./responseParser";

type FetchImplementation = typeof fetch;

interface OpenAIResponsePayload {
  status?: string;
  incomplete_details?: { reason?: string } | null;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
      refusal?: string;
    }>;
  }>;
}

function createResponseSchema(): Record<string, unknown> {
  const generated = z.toJSONSchema(JobReadinessAnalysisSchema) as Record<
    string,
    unknown
  >;
  const { $schema: _schemaVersion, ...schema } = generated;
  return schema;
}

const responseSchema = createResponseSchema();

function extractOutputText(payload: OpenAIResponsePayload): string | null {
  for (const item of payload.output ?? []) {
    if (item.type !== "message") continue;
    for (const content of item.content ?? []) {
      if (content.type === "refusal") {
        throw new AppError(
          "PROVIDER_REQUEST_FAILED",
          502,
          "The analysis provider could not complete the request.",
          { logMessage: "OpenAI refused to produce the requested analysis." },
        );
      }
      if (content.type === "output_text" && content.text) {
        return content.text;
      }
    }
  }
  return null;
}

export class OpenAIProvider implements AIProvider {
  readonly #apiKey?: string;

  constructor(
    apiKey?: string,
    private readonly requestTimeoutMs = 45_000,
    private readonly modelName = "gpt-5.6-luna",
    private readonly fetchImplementation: FetchImplementation = fetch,
  ) {
    this.#apiKey = apiKey;
  }

  isConfigured(): boolean {
    return Boolean(this.#apiKey);
  }

  async analyzeJobReadiness(
    request: AnalyzeJobReadinessRequest,
    options: { signal?: AbortSignal } = {},
  ): Promise<JobReadinessAnalysis> {
    if (!this.#apiKey) {
      throw new AppError(
        "PROVIDER_NOT_CONFIGURED",
        503,
        "Live analysis is unavailable because the AI provider is not configured.",
      );
    }

    const controller = new AbortController();
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, this.requestTimeoutMs);
    const abortFromCaller = () => controller.abort(options.signal?.reason);
    options.signal?.addEventListener("abort", abortFromCaller, { once: true });

    try {
      const prompt = buildAnalysisPrompt(request);
      const response = await this.fetchImplementation(
        "https://api.openai.com/v1/responses",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.#apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: this.modelName,
            input: [
              { role: "system", content: prompt.systemInstruction },
              { role: "user", content: prompt.userPrompt },
            ],
            text: {
              format: {
                type: "json_schema",
                name: "job_readiness_analysis",
                strict: true,
                schema: responseSchema,
              },
            },
            max_output_tokens: 8_000,
            store: false,
          }),
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        throw new AppError(
          "PROVIDER_REQUEST_FAILED",
          502,
          "The analysis provider could not complete the request.",
          { logMessage: `OpenAI request failed with HTTP ${response.status}.` },
        );
      }

      const payload = (await response.json()) as OpenAIResponsePayload;
      if (payload.status === "incomplete") {
        throw new AppError(
          "PROVIDER_RESPONSE_INVALID",
          502,
          "The analysis provider returned an invalid response.",
          {
            logMessage: `OpenAI response was incomplete (${payload.incomplete_details?.reason ?? "unknown"}).`,
          },
        );
      }

      const outputText = extractOutputText(payload);
      if (!outputText) {
        throw new AppError(
          "PROVIDER_RESPONSE_INVALID",
          502,
          "The analysis provider returned an invalid response.",
          { logMessage: "OpenAI returned no structured output text." },
        );
      }

      return parseJobReadinessResponse(outputText);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;

      if (timedOut) {
        throw new AppError(
          "PROVIDER_TIMEOUT",
          504,
          "The analysis provider took too long to respond. Please try again.",
          { cause: error, logMessage: "OpenAI request timed out." },
        );
      }

      throw new AppError(
        "PROVIDER_REQUEST_FAILED",
        502,
        "The analysis provider could not complete the request.",
        { cause: error, logMessage: "OpenAI request failed." },
      );
    } finally {
      clearTimeout(timeout);
      options.signal?.removeEventListener("abort", abortFromCaller);
    }
  }
}
