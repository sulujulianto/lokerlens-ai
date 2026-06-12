import { describe, expect, it } from "vitest";
import type { ServerConfig } from "../config";
import { AppError } from "../errors";
import { GeminiProvider } from "./geminiProvider";
import { resolveAIProvider } from "./providerResolver";

const baseConfig: ServerConfig = {
  port: 3000,
  aiProvider: "gemini",
  geminiApiKey: "server-secret",
  analysisAvailable: true,
};

describe("resolveAIProvider", () => {
  it("returns a configured Gemini provider", () => {
    const provider = resolveAIProvider(baseConfig);

    expect(provider).toBeInstanceOf(GeminiProvider);
    expect(provider.isConfigured()).toBe(true);
  });

  it("does not expose the API key when serialized", () => {
    const provider = resolveAIProvider(baseConfig);

    expect(JSON.stringify(provider)).not.toContain("server-secret");
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
