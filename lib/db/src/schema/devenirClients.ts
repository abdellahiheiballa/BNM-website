import { pgTable, serial, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const devenirClientsTable = pgTable("devenir_clients", {
  id: serial("id").primaryKey(),
  nomComplet: varchar("nom_complet", { length: 200 }).notNull(),
  cinPasseport: varchar("cin_passeport", { length: 100 }).notNull(),
  telephone: varchar("telephone", { length: 50 }).notNull(),
  adresse: text("adresse").notNull(),
  secteurActivite: varchar("secteur_activite", { length: 100 }).notNull(),
  cinPasseportPath: varchar("cin_passeport_path", { length: 500 }).notNull(),
  justificatifPath: varchar("justificatif_path", { length: 500 }).notNull(),
  emailEnvoye: boolean("email_envoye").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDevenirClientSchema = createInsertSchema(devenirClientsTable).omit({ id: true, emailEnvoye: true, createdAt: true });
export type InsertDevenirClient = z.infer<typeof insertDevenirClientSchema>;
export type DevenirClient = typeof devenirClientsTable.$inferSelect;
