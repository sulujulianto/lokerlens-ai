import express, {
  type ErrorRequestHandler,
  type Express,
} from "express";
import helmet from "helmet";
import { randomUUID } from "node:crypto";
import {
  AppError,
  createInternalError,
  getPublicErrorResponse,
  logServerError,
} from "./errors";
import type { ServerConfig } from "./config";
import { createAnalyzeRouter } from "./routes/analyze";
import { apiNotFoundHandler } from "./routes/apiNotFound";
import { createHealthRouter } from "./routes/health";
import type { JobReadinessService } from "./services/jobReadinessService";

interface CreateAppOptions {
  isProduction?: boolean;
  setupHosting?: (app: Express) => Promise<void> | void;
}

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const normalizedError =
    error instanceof AppError
      ? error
      : error?.type === "entity.too.large"
        ? new AppError(
            "VALIDATION_ERROR",
            413,
            "Request body is too large.",
          )
        : createInternalError();

  logServerError(normalizedError, res.locals.requestId);
  res
    .status(normalizedError.httpStatus)
    .json(getPublicErrorResponse(normalizedError));
};

export async function createApp(
  config: ServerConfig,
  jobReadinessService: JobReadinessService,
  options: CreateAppOptions = {},
): Promise<Express> {
  const app = express();
  const isProduction =
    options.isProduction ?? process.env.NODE_ENV === "production";

  app.disable("x-powered-by");
  app.use(
    helmet({
      contentSecurityPolicy: isProduction
        ? {
            directives: {
              defaultSrc: ["'self'"],
              connectSrc: ["'self'"],
              fontSrc: ["'self'", "data:"],
              frameAncestors: ["'none'"],
              imgSrc: ["'self'", "data:"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'"],
            },
          }
        : false,
      frameguard: { action: "deny" },
    }),
  );
  app.use((_req, res, next) => {
    const requestId = randomUUID();
    res.locals.requestId = requestId;
    res.setHeader("X-Request-ID", requestId);
    res.setHeader(
      "Permissions-Policy",
      "camera=(), geolocation=(), microphone=()",
    );
    next();
  });
  app.use(express.json({ limit: "1mb" }));
  app.use("/api", createHealthRouter(config));
  app.use(
    "/api",
    createAnalyzeRouter(jobReadinessService, {
      windowMs: config.analysisRateLimitWindowMs,
      max: config.analysisRateLimitMax,
    }),
  );
  app.use("/api", apiNotFoundHandler);

  await options.setupHosting?.(app);
  app.use(errorHandler);

  return app;
}
