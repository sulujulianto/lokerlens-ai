import { Router } from "express";
import { adaptLegacyAnalyzeRequest } from "../compatibility/legacyRequestAdapter";
import { adaptToLegacyAnalysisResponse } from "../compatibility/legacyResponseAdapter";
import {
  AppError,
  createInternalError,
  getPublicErrorResponse,
  logServerError,
} from "../errors";
import type { JobReadinessService } from "../services/jobReadinessService";

export function createAnalyzeRouter(service: JobReadinessService): Router {
  const router = Router();

  router.post("/analyze", async (req, res) => {
    try {
      const request = adaptLegacyAnalyzeRequest(req.body);
      const analysis = await service.analyze(request);
      res.json(adaptToLegacyAnalysisResponse(analysis));
    } catch (error: unknown) {
      const normalizedError =
        error instanceof AppError ? error : createInternalError(error);
      logServerError(normalizedError);
      res
        .status(normalizedError.httpStatus)
        .json(getPublicErrorResponse(normalizedError));
    }
  });

  return router;
}
