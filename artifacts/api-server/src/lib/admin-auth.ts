import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import { db, adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const SESSION_COOKIE_NAME = "admin_session";
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";

export function requireAdmin() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sessionToken = req.cookies?.[SESSION_COOKIE_NAME];

    if (!sessionToken) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    try {
      const [admin] = await db
        .select()
        .from(adminsTable)
        .where(eq(adminsTable.id, Number(sessionToken)));

      if (!admin || admin.role !== "admin") {
        res.status(403).json({ error: "Admin access required" });
        return;
      }

      (req as any).admin = admin;
      next();
    } catch {
      res.status(401).json({ error: "Invalid session" });
    }
  };
}

export async function seedDefaultAdmin() {
  const [existing] = await db
    .select()
    .from(adminsTable)
    .where(eq(adminsTable.username, "admin"));

  if (!existing) {
    const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    await db.insert(adminsTable).values({
      username: "admin",
      passwordHash,
      role: "admin",
    });
    console.error(`[admin] Created default admin with password "${DEFAULT_ADMIN_PASSWORD}"`);
  }
}