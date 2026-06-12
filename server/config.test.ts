import { describe, expect, it } from "vitest";
import { loadServerConfig } from "./config";
import { AppError } from "./errors";

describe("loadServerConfig", () => {
  it("defaults the provider to Gemini", () => {
    const config = loadServerConfig({});

    expect(config.aiProvider).toBe("gemini");
    expect(config.port).toBe(3000);
  });

  it("accepts an explicit Gemini provider", () => {
    const config = loadServerConfig({ AI_PROVIDER: "gemini" });

    expect(config.aiProvider).toBe("gemini");
  });

  it("rejects an unknown provider with a controlled error", () => {
    expect(() => loadServerConfig({ AI_PROVIDER: "unknown" })).toThrow(
      AppError,
    );
  });

  it("marks live analysis unavailable when the API key is missing", () => {
    const config = loadServerConfig({ AI_PROVIDER: "gemini" });

    expect(config.analysisAvailable).toBe(false);
    expect(config.geminiApiKey).toBeUndefined();
  });

  it("marks live analysis available when the API key is present", () => {
    const config = loadServerConfig({
      AI_PROVIDER: "gemini",
      GEMINI_API_KEY: "server-secret",
    });

    expect(config.analysisAvailable).toBe(true);
  });
});
