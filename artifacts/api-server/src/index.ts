import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

// Default port for local/dev usage.
// Allows running the server without explicitly setting PORT.
const port = rawPort ? Number(rawPort) : 3000;

if (!port || Number.isNaN(port) || port <= 0) {
  throw new Error(
    `Invalid PORT value: "${rawPort ?? "(missing)"}". Expected a positive number.`,
  );
}


if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
