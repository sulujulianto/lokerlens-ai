import { z } from "zod";
import { AppError } from "./errors";

const ProviderSchema = z.enum(["gemini"]);

export type SupportedAIProvider = z.infer<typeof ProviderSchema>;

export interface ServerConfig {
  port: number;
  aiProvider: SupportedAIProvider;
  geminiApiKey?: string;
  analysisAvailable: boolean;
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

  const portValue = environment.PORT?.trim() || "3000";
  const port = Number(portValue);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new AppError(
      "INTERNAL_ERROR",
      500,
      "Server port configuration is invalid.",
      { logMessage: "Invalid PORT configuration." },
    );
  }

  const geminiApiKey = environment.GEMINI_API_KEY?.trim() || undefined;

  return {
    port,
    aiProvider: providerResult.data,
    geminiApiKey,
    analysisAvailable:
      providerResult.data === "gemini" && Boolean(geminiApiKey),
  };
}
