export type AppErrorCode =
  | "VALIDATION_ERROR"
  | "PROVIDER_NOT_CONFIGURED"
  | "PROVIDER_TIMEOUT"
  | "PROVIDER_RESPONSE_INVALID"
  | "PROVIDER_REQUEST_FAILED"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

interface AppErrorOptions {
  cause?: unknown;
  logMessage?: string;
}

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly httpStatus: number;
  readonly publicMessage: string;
  readonly logMessage?: string;

  constructor(
    code: AppErrorCode,
    httpStatus: number,
    publicMessage: string,
    options: AppErrorOptions = {},
  ) {
    super(publicMessage, { cause: options.cause });
    this.name = "AppError";
    this.code = code;
    this.httpStatus = httpStatus;
    this.publicMessage = publicMessage;
    this.logMessage = options.logMessage;
  }
}

export function createValidationError(
  message = "The submitted data is invalid.",
): AppError {
  return new AppError("VALIDATION_ERROR", 400, message);
}

export function createInternalError(cause?: unknown): AppError {
  return new AppError(
    "INTERNAL_ERROR",
    500,
    "An unexpected server error occurred.",
    { cause, logMessage: "Unexpected internal server error." },
  );
}

export function getPublicErrorResponse(error: AppError) {
  return {
    error: error.publicMessage,
    code: error.code,
  };
}

export function logServerError(error: AppError, requestId?: string): void {
  const requestContext = requestId ? ` [requestId=${requestId}]` : "";
  console.error(
    `[${error.code}]${requestContext} ${error.logMessage ?? error.publicMessage}`,
  );
}
