import { z } from "zod";
import { AppError } from "./errors";

const ProviderSchema = z.enum(["gemini", "openai"]);

export type SupportedAIProvider = z.infer<typeof ProviderSchema>;

export interface ServerConfig {
  port: number;
  aiProvider: SupportedAIProvider;
  geminiApiKey?: string;
  geminiModel: string;
  openAIKey?: string;
  openAIModel: string;
  analysisAvailable: boolean;
  aiRequestTimeoutMs: number;
  analysisRateLimitMax: number;
  analysisRateLimitWindowMs: number;
}

function parseIntegerSetting(
  value: string | undefined,
  fallback: number,
  settingName: string,
  minimum: number,
  maximum: number,
): number {
  const normalized = value?.trim() || String(fallback);
  const parsed = Number(normalized);

  if (!Number.isInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new AppError(
      "INTERNAL_ERROR",
      500,
      "Server runtime configuration is invalid.",
      { logMessage: `Invalid ${settingName} configuration.` },
    );
  }

  return parsed;
}

export function loadServerConfig(
  environment: NodeJS.ProcessEnv = process.env,
): ServerConfig {
  const providerResult = ProviderSchema.safeParse(
    environment.AI_PROVIDER?.trim() || "gemini",
  );

  if (!providerResult.success) {
    throw new AppError(
      "INTERNAL_ERROR",
      500,
      "Server AI provider configuration is invalid.",
      { logMessage: "Unsupported AI_PROVIDER configuration." },
    );
  }

  const port = parseIntegerSetting(
    environment.PORT,
    3000,
    "PORT",
    1,
    65_535,
  );
  const aiRequestTimeoutMs = parseIntegerSetting(
    environment.AI_REQUEST_TIMEOUT_MS,
    45_000,
    "AI_REQUEST_TIMEOUT_MS",
    5_000,
    120_000,
  );
  const analysisRateLimitMax = parseIntegerSetting(
    environment.ANALYSIS_RATE_LIMIT_MAX,
    10,
    "ANALYSIS_RATE_LIMIT_MAX",
    1,
    100,
  );
  const analysisRateLimitWindowMs = parseIntegerSetting(
    environment.ANALYSIS_RATE_LIMIT_WINDOW_MS,
    60_000,
    "ANALYSIS_RATE_LIMIT_WINDOW_MS",
    10_000,
    3_600_000,
  );

  const geminiApiKey = environment.GEMINI_API_KEY?.trim() || undefined;
  const geminiModel = environment.GEMINI_MODEL?.trim() || "gemini-3.5-flash";
  const openAIKey = environment.OPENAI_API_KEY?.trim() || undefined;
  const openAIModel = environment.OPENAI_MODEL?.trim() || "gpt-5.6-luna";

  const selectedProviderConfigured =
    providerResult.data === "gemini"
      ? Boolean(geminiApiKey)
      : Boolean(openAIKey);

  return {
    port,
    aiProvider: providerResult.data,
    geminiApiKey,
    geminiModel,
    openAIKey,
    openAIModel,
    analysisAvailable: selectedProviderConfigured,
    aiRequestTimeoutMs,
    analysisRateLimitMax,
    analysisRateLimitWindowMs,
  };
}
