import { pgTable, serial, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const actualitesTable = pgTable("actualites", {
  id: serial("id").primaryKey(),
  titre: varchar("titre", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).unique().notNull(),
  contenu: text("contenu").notNull(),
  image: varchar("image", { length: 500 }),
  categorie: varchar("categorie", { length: 100 }),
  datePublication: timestamp("date_publication").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertActualiteSchema = createInsertSchema(actualitesTable).omit({ id: true, createdAt: true });
export type InsertActualite = z.infer<typeof insertActualiteSchema>;
export type Actualite = typeof actualitesTable.$inferSelect;
