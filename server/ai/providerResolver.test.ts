import { describe, expect, it } from "vitest";
import type { ServerConfig } from "../config";
import { AppError } from "../errors";
import { GeminiProvider } from "./geminiProvider";
import { OpenAIProvider } from "./openAIProvider";
import { resolveAIProvider } from "./providerResolver";

const baseConfig: ServerConfig = {
  port: 3000,
  aiProvider: "gemini",
  geminiApiKey: "server-secret",
  geminiModel: "gemini-3.5-flash",
  openAIKey: undefined,
  openAIModel: "gpt-5.6-luna",
  analysisAvailable: true,
  aiRequestTimeoutMs: 45_000,
  analysisRateLimitMax: 10,
  analysisRateLimitWindowMs: 60_000,
};

describe("resolveAIProvider", () => {
  it("returns a configured Gemini provider", () => {
    const provider = resolveAIProvider(baseConfig);

    expect(provider).toBeInstanceOf(GeminiProvider);
    expect(provider.isConfigured()).toBe(true);
  });

  it("returns a configured OpenAI provider", () => {
    const provider = resolveAIProvider({
      ...baseConfig,
      aiProvider: "openai",
      openAIKey: "openai-secret",
    });

    expect(provider).toBeInstanceOf(OpenAIProvider);
    expect(provider.isConfigured()).toBe(true);
  });

  it("does not expose the API key when serialized", () => {
    const provider = resolveAIProvider(baseConfig);

    expect(JSON.stringify(provider)).not.toContain("server-secret");

    const openAIProvider = resolveAIProvider({
      ...baseConfig,
      aiProvider: "openai",
      openAIKey: "openai-secret",
    });
    expect(JSON.stringify(openAIProvider)).not.toContain("openai-secret");
  });

  it("rejects unsupported provider values", () => {
    expect(() =>
      resolveAIProvider({
        ...baseConfig,
        aiProvider: "unsupported",
      } as unknown as ServerConfig),
    ).toThrow(AppError);
  });
});
