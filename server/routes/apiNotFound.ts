import type { RequestHandler } from "express";

export const apiNotFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    error: "API endpoint not found.",
    code: "NOT_FOUND",
  });
};
