import { Router } from "express";
import type { ServerConfig } from "../config";

export function createHealthRouter(config: ServerConfig): Router {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({
      ok: true,
      analysisAvailable: config.analysisAvailable,
    });
  });

  return router;
}
