import { pgTable, serial, varchar, text, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const offresTable = pgTable("offres" , {

  id: serial("id").primaryKey(),
  titre: varchar("titre", { length: 200 }).notNull(),
  titre_fr: varchar("titre_fr", { length: 200 }),
  titre_ar: varchar("titre_ar", { length: 200 }),
  titre_en: varchar("titre_en", { length: 200 }),
  slug: varchar("slug", { length: 200 }).unique().notNull(),
  description: text("description"),
  description_fr: text("description_fr"),
  description_ar: text("description_ar"),
  description_en: text("description_en"),
  image: varchar("image", { length: 500 }),
  icone: varchar("icone", { length: 100 }),
  clickByBnm: boolean("click_by_bnm").default(false).notNull(),
  categorie: varchar("categorie", { length: 50 }).notNull(),
  ordre: integer("ordre").default(0).notNull(),
});

export const insertOffreSchema = createInsertSchema(offresTable).omit({ id: true });
export type InsertOffre = z.infer<typeof insertOffreSchema>;
export type Offre = typeof offresTable.$inferSelect;
