import { Router } from "express";
import type { ServerConfig } from "../config";

export function createHealthRouter(config: ServerConfig): Router {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({
      ok: true,
      analysisAvailable: config.analysisAvailable,
      // Temporary V1 compatibility field. Remove after the frontend migration.
      geminiConfigured: config.analysisAvailable,
    });
  });

  return router;
}
