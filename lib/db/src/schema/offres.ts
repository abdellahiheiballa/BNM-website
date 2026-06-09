import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const offresTable = pgTable("offres" , {

  id: serial("id").primaryKey(),
  titre: varchar("titre", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).unique().notNull(),
  description: text("description"),
  icone: varchar("icone", { length: 100 }),
  categorie: varchar("categorie", { length: 50 }).notNull(),
  ordre: integer("ordre").default(0).notNull(),
});

export const insertOffreSchema = createInsertSchema(offresTable).omit({ id: true });
export type InsertOffre = z.infer<typeof insertOffreSchema>;
export type Offre = typeof offresTable.$inferSelect;
