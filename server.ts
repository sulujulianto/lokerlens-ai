import dotenv from "dotenv";
import express, { type Express } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { resolveAIProvider } from "./server/ai/providerResolver";
import { createApp } from "./server/app";
import { loadServerConfig } from "./server/config";
import {
  AppError,
  createInternalError,
  logServerError,
} from "./server/errors";
import { JobReadinessService } from "./server/services/jobReadinessService";

dotenv.config();

async function setupHosting(app: Express) {
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
    app.use(
      express.static(distPath, {
        setHeaders: (res, filePath) => {
          if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader(
              "Cache-Control",
              "public, max-age=31536000, immutable",
            );
          }
        },
      }),
    );
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

async function startServer(): Promise<void> {
  const config = loadServerConfig();
  const provider = resolveAIProvider(config);
  const jobReadinessService = new JobReadinessService(provider);
  const app = await createApp(config, jobReadinessService, { setupHosting });

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
