import { db } from "@/db"
import { decksTable } from "@/db/schema"
import { eq, and, count } from "drizzle-orm"
import type { InferSelectModel, InferInsertModel } from "drizzle-orm"

export type Deck = InferSelectModel<typeof decksTable>
export type NewDeck = InferInsertModel<typeof decksTable>

export async function createDeck(title: string, description: string | undefined, userId: string) {
  const [newDeck] = await db
    .insert(decksTable)
    .values({
      title,
      description,
      userId,
    })
    .returning()
  
  return newDeck
}

export async function getUserDecks(userId: string) {
  const decks = await db
    .select()
    .from(decksTable)
    .where(eq(decksTable.userId, userId))
    .orderBy(decksTable.createdAt)
  
  return decks
}

export async function getDeckById(deckId: number, userId: string) {
  const [deck] = await db
    .select()
    .from(decksTable)
    .where(and(
      eq(decksTable.id, deckId),
      eq(decksTable.userId, userId)
    ))
  
  return deck || null
}

export async function getUserDeckStats(userId: string) {
  const deckStats = await db
    .select({
      deckCount: count(),
    })
    .from(decksTable)
    .where(eq(decksTable.userId, userId))
  
  return deckStats[0]?.deckCount || 0
}

export async function updateDeck(
  deckId: number, 
  userId: string, 
  updates: { title?: string; description?: string }
) {
  const [updatedDeck] = await db
    .update(decksTable)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(and(
      eq(decksTable.id, deckId),
      eq(decksTable.userId, userId)
    ))
    .returning()
  
  if (!updatedDeck) {
    throw new Error("Deck not found or access denied")
  }
  
  return updatedDeck
}

export async function deleteDeck(deckId: number, userId: string) {
  const [deletedDeck] = await db
    .delete(decksTable)
    .where(and(
      eq(decksTable.id, deckId),
      eq(decksTable.userId, userId)
    ))
    .returning()
  
  if (!deletedDeck) {
    throw new Error("Deck not found or access denied")
  }
  
  return deletedDeck
} 