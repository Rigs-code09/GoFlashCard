import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const decksTable = pgTable("decks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  userId: varchar({ length: 255 }).notNull(), // Clerk user ID
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const cardsTable = pgTable("cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  deckId: integer().references(() => decksTable.id, { onDelete: "cascade" }).notNull(),
  front: text().notNull(),
  back: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
}); 