import type { ServerConfig } from "../config";
import { AppError } from "../errors";
import { GeminiProvider } from "./geminiProvider";
import type { AIProvider } from "./provider";

export function resolveAIProvider(config: ServerConfig): AIProvider {
  switch (config.aiProvider) {
    case "gemini":
      return new GeminiProvider(config.geminiApiKey);
    default:
      throw new AppError(
        "INTERNAL_ERROR",
        500,
        "Server AI provider configuration is invalid.",
        { logMessage: "Provider resolver received an unsupported provider." },
      );
  }
}
