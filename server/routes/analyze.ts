import { Router } from "express";
import { AnalyzeJobReadinessRequestSchema } from "../../shared/analysisSchemas";
import { adaptLegacyAnalyzeRequest } from "../compatibility/legacyRequestAdapter";
import { adaptToLegacyAnalysisResponse } from "../compatibility/legacyResponseAdapter";
import {
  AppError,
  createInternalError,
  createValidationError,
  getPublicErrorResponse,
  logServerError,
} from "../errors";
import type { JobReadinessService } from "../services/jobReadinessService";

export async function processAnalyzePayload(
  payload: unknown,
  service: JobReadinessService,
): Promise<unknown> {
  const v2Result = AnalyzeJobReadinessRequestSchema.safeParse(payload);
  if (v2Result.success) {
    return service.analyze(v2Result.data);
  }

  try {
    // Temporary legacy path. Remove after V1 clients are no longer supported.
    const legacyRequest = adaptLegacyAnalyzeRequest(payload);
    const analysis = await service.analyze(legacyRequest);
    return adaptToLegacyAnalysisResponse(analysis);
  } catch (error: unknown) {
    if (error instanceof AppError && error.code === "VALIDATION_ERROR") {
      throw createValidationError("The submitted analysis request is invalid.");
    }
    throw error;
  }
}

export function createAnalyzeRouter(service: JobReadinessService): Router {
  const router = Router();

  router.post("/analyze", async (req, res) => {
    try {
      res.json(await processAnalyzePayload(req.body, service));
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
