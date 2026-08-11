import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AnalyzeJobReadinessRequestSchema } from "../../shared/analysisSchemas";
import { adaptLegacyAnalyzeRequest } from "../compatibility/legacyRequestAdapter";
import { adaptToLegacyAnalysisResponse } from "../compatibility/legacyResponseAdapter";
import {
  AppError,
  createValidationError,
} from "../errors";
import type { JobReadinessService } from "../services/jobReadinessService";

export async function processAnalyzePayload(
  payload: unknown,
  service: JobReadinessService,
  options: { signal?: AbortSignal } = {},
): Promise<unknown> {
  const v2Result = AnalyzeJobReadinessRequestSchema.safeParse(payload);
  if (v2Result.success) {
    return service.analyze(v2Result.data, options);
  }

  try {
    // Temporary legacy path. Remove after V1 clients are no longer supported.
    const legacyRequest = adaptLegacyAnalyzeRequest(payload);
    const analysis = await service.analyze(legacyRequest, options);
    return adaptToLegacyAnalysisResponse(analysis);
  } catch (error: unknown) {
    if (error instanceof AppError && error.code === "VALIDATION_ERROR") {
      throw createValidationError("The submitted analysis request is invalid.");
    }
    throw error;
  }
}

export function createAnalyzeRouter(
  service: JobReadinessService,
  rateLimitConfig: { windowMs: number; max: number },
): Router {
  const router = Router();
  const analysisLimiter = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    limit: rateLimitConfig.max,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({
        error: "Too many analysis requests. Please wait and try again.",
        code: "RATE_LIMITED",
      });
    },
  });

  router.post("/analyze", analysisLimiter, async (req, res, next) => {
    const controller = new AbortController();
    const abortRequest = () => controller.abort();
    req.once("aborted", abortRequest);
    res.once("close", () => {
      if (!res.writableEnded) abortRequest();
    });

    try {
      res.json(
        await processAnalyzePayload(req.body, service, {
          signal: controller.signal,
        }),
      );
    } catch (error: unknown) {
      next(error);
    }
  });

  return router;
}
