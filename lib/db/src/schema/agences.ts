import { pgTable, serial, varchar, text, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const agencesTable = pgTable("agences", {
  id: serial("id").primaryKey(),
  nom: varchar("nom", { length: 200 }).notNull(),
  adresse: text("adresse"),
  ville: varchar("ville", { length: 100 }),
  telephone: varchar("telephone", { length: 50 }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  horaires: text("horaires"),
});

export const insertAgenceSchema = createInsertSchema(agencesTable).omit({ id: true });
export type InsertAgence = z.infer<typeof insertAgenceSchema>;
export type Agence = typeof agencesTable.$inferSelect;
