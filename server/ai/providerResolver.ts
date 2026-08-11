import type { ServerConfig } from "../config";
import { AppError } from "../errors";
import { GeminiProvider } from "./geminiProvider";
import { OpenAIProvider } from "./openAIProvider";
import type { AIProvider } from "./provider";

export function resolveAIProvider(config: ServerConfig): AIProvider {
  switch (config.aiProvider) {
    case "gemini":
      return new GeminiProvider(
        config.geminiApiKey,
        config.aiRequestTimeoutMs,
        config.geminiModel,
      );
    case "openai":
      return new OpenAIProvider(
        config.openAIKey,
        config.aiRequestTimeoutMs,
        config.openAIModel,
      );
    default:
      throw new AppError(
        "INTERNAL_ERROR",
        500,
        "Server AI provider configuration is invalid.",
        { logMessage: "Provider resolver received an unsupported provider." },
      );
  }
}
