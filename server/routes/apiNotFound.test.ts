import express from "express";
import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { apiNotFoundHandler } from "./apiNotFound";

describe("apiNotFoundHandler", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    const app = express();

    app.get("/api/valid", (_req, res) => {
      res.json({ ok: true });
    });
    app.use("/api", apiNotFoundHandler);
    app.use((_req, res) => {
      res.status(200).send("SPA fallback");
    });

    await new Promise<void>((resolve, reject) => {
      server = app.listen(0, "127.0.0.1", resolve);
      server.once("error", reject);
    });

    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Test server did not bind to a TCP port.");
    }
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  it("returns the expected JSON 404 for an unknown GET endpoint", async () => {
    const response = await fetch(`${baseUrl}/api/unknown`);

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual({
      error: "API endpoint not found.",
      code: "NOT_FOUND",
    });
  });

  it("returns the expected JSON 404 for an unknown POST endpoint", async () => {
    const response = await fetch(`${baseUrl}/api/unknown`, {
      method: "POST",
    });

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual({
      error: "API endpoint not found.",
      code: "NOT_FOUND",
    });
  });

  it("preserves valid API endpoints registered before the handler", async () => {
    const response = await fetch(`${baseUrl}/api/valid`);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("allows non-API routes to reach the following fallback", async () => {
    const response = await fetch(`${baseUrl}/portfolio`);

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe("SPA fallback");
  });
});
