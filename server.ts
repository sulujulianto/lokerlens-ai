import dotenv from "dotenv";
import express, { type ErrorRequestHandler } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { resolveAIProvider } from "./server/ai/providerResolver";
import { loadServerConfig } from "./server/config";
import {
  AppError,
  createInternalError,
  getPublicErrorResponse,
  logServerError,
} from "./server/errors";
import { createAnalyzeRouter } from "./server/routes/analyze";
import { createHealthRouter } from "./server/routes/health";
import { JobReadinessService } from "./server/services/jobReadinessService";

dotenv.config();

async function setupHosting(app: express.Express) {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite middleware for development...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static production assets from /dist/public...");
    const distPath = path.join(process.cwd(), "dist", "public");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
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

  logServerError(normalizedError);
  res
    .status(normalizedError.httpStatus)
    .json(getPublicErrorResponse(normalizedError));
};

async function startServer(): Promise<void> {
  const config = loadServerConfig();
  const provider = resolveAIProvider(config);
  const jobReadinessService = new JobReadinessService(provider);
  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use("/api", createHealthRouter(config));
  app.use("/api", createAnalyzeRouter(jobReadinessService));

  await setupHosting(app);
  app.use(errorHandler);

  await new Promise<void>((resolve, reject) => {
    const server = app.listen(config.port, "0.0.0.0", () => {
      console.log(
        `LokerLens AI server running at http://0.0.0.0:${config.port}`,
      );
      resolve();
    });
    server.on("error", reject);
  });
}

startServer().catch((error: unknown) => {
  logServerError(
    error instanceof AppError ? error : createInternalError(error),
  );
  process.exitCode = 1;
});
