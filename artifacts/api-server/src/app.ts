import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import cookieParser from "cookie-parser";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

app.use("/api", router);

// Global error handler (ensures we always log the root cause)
app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err, req: { method: req.method, url: req.url } }, "Unhandled error");

  if (res.headersSent) {
    return;
  }

  // Avoid leaking internals.
  res.status(500).json({
    error: "Internal Server Error",
    message:
      err instanceof Error ? err.message : "An unexpected error occurred",
  });
});

export default app;

