import { describe, expect, it } from "vitest";
import { loadServerConfig } from "./config";
import { AppError } from "./errors";

describe("loadServerConfig", () => {
  it("defaults the provider to Gemini", () => {
    const config = loadServerConfig({});

    expect(config.aiProvider).toBe("gemini");
    expect(config.geminiModel).toBe("gemini-3.5-flash");
    expect(config.openAIModel).toBe("gpt-5.6-luna");
    expect(config.port).toBe(3000);
    expect(config.aiRequestTimeoutMs).toBe(45_000);
    expect(config.analysisRateLimitMax).toBe(10);
    expect(config.analysisRateLimitWindowMs).toBe(60_000);
  });

  it("accepts an explicit Gemini provider", () => {
    const config = loadServerConfig({ AI_PROVIDER: "gemini" });

    expect(config.aiProvider).toBe("gemini");
  });

  it("accepts OpenAI and uses only the selected provider key for availability", () => {
    const withoutSelectedKey = loadServerConfig({
      AI_PROVIDER: "openai",
      GEMINI_API_KEY: "unused-gemini-key",
    });
    const configured = loadServerConfig({
      AI_PROVIDER: "openai",
      OPENAI_API_KEY: "server-secret",
      OPENAI_MODEL: "configured-model",
    });

    expect(withoutSelectedKey.analysisAvailable).toBe(false);
    expect(configured.analysisAvailable).toBe(true);
    expect(configured.openAIModel).toBe("configured-model");
  });

  it("accepts a configurable Gemini model", () => {
    const config = loadServerConfig({ GEMINI_MODEL: "configured-gemini" });

    expect(config.geminiModel).toBe("configured-gemini");
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

  it("accepts bounded timeout and rate-limit settings", () => {
    const config = loadServerConfig({
      AI_REQUEST_TIMEOUT_MS: "30000",
      ANALYSIS_RATE_LIMIT_MAX: "5",
      ANALYSIS_RATE_LIMIT_WINDOW_MS: "120000",
    });

    expect(config.aiRequestTimeoutMs).toBe(30_000);
    expect(config.analysisRateLimitMax).toBe(5);
    expect(config.analysisRateLimitWindowMs).toBe(120_000);
  });

  it.each([
    ["AI_REQUEST_TIMEOUT_MS", "1000"],
    ["ANALYSIS_RATE_LIMIT_MAX", "0"],
    ["ANALYSIS_RATE_LIMIT_WINDOW_MS", "not-a-number"],
  ])("rejects invalid %s", (settingName, value) => {
    expect(() => loadServerConfig({ [settingName]: value })).toThrow(AppError);
  });
});
