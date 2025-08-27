import { db } from "@/db"
import { cardsTable, decksTable } from "@/db/schema"
import { eq, and, ilike, or } from "drizzle-orm"
import type { InferSelectModel, InferInsertModel } from "drizzle-orm"

export type Card = InferSelectModel<typeof cardsTable>
export type NewCard = InferInsertModel<typeof cardsTable>

export async function createCard(deckId: number, front: string, back: string, userId: string) {
  // Verify deck ownership first
  const [deck] = await db
    .select()
    .from(decksTable)
    .where(and(
      eq(decksTable.id, deckId),
      eq(decksTable.userId, userId)
    ))
  
  if (!deck) {
    throw new Error("Deck not found or access denied")
  }

  const [newCard] = await db
    .insert(cardsTable)
    .values({
      deckId,
      front,
      back,
    })
    .returning()
  
  return newCard
}

export async function getDeckCards(deckId: number, userId: string) {
  // Verify deck ownership and get cards
  const cards = await db
    .select({
      id: cardsTable.id,
      front: cardsTable.front,
      back: cardsTable.back,
      createdAt: cardsTable.createdAt,
      updatedAt: cardsTable.updatedAt,
    })
    .from(cardsTable)
    .innerJoin(decksTable, eq(cardsTable.deckId, decksTable.id))
    .where(and(
      eq(decksTable.userId, userId),
      eq(cardsTable.deckId, deckId)
    ))
    .orderBy(cardsTable.createdAt)
  
  return cards
}

export async function getCardById(cardId: number, userId: string) {
  const [card] = await db
    .select({
      id: cardsTable.id,
      deckId: cardsTable.deckId,
      front: cardsTable.front,
      back: cardsTable.back,
      createdAt: cardsTable.createdAt,
      updatedAt: cardsTable.updatedAt,
    })
    .from(cardsTable)
    .innerJoin(decksTable, eq(cardsTable.deckId, decksTable.id))
    .where(and(
      eq(cardsTable.id, cardId),
      eq(decksTable.userId, userId)
    ))
  
  return card || null
}

export async function updateCard(
  cardId: number,
  userId: string,
  updates: { front?: string; back?: string }
) {
  const [updatedCard] = await db
    .update(cardsTable)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .from(cardsTable)
    .innerJoin(decksTable, eq(cardsTable.deckId, decksTable.id))
    .where(and(
      eq(cardsTable.id, cardId),
      eq(decksTable.userId, userId)
    ))
    .returning()
  
  if (!updatedCard) {
    throw new Error("Card not found or access denied")
  }
  
  return updatedCard
}

export async function deleteCard(cardId: number, userId: string) {
  // First verify ownership through deck relationship
  const [card] = await db
    .select({
      id: cardsTable.id,
      deckId: cardsTable.deckId,
    })
    .from(cardsTable)
    .innerJoin(decksTable, eq(cardsTable.deckId, decksTable.id))
    .where(and(
      eq(cardsTable.id, cardId),
      eq(decksTable.userId, userId)
    ))
  
  if (!card) {
    throw new Error("Card not found or access denied")
  }
  
  // Now delete the card
  const [deletedCard] = await db
    .delete(cardsTable)
    .where(eq(cardsTable.id, cardId))
    .returning()
  
  return deletedCard
}

export async function searchCardsInDeck(deckId: number, userId: string, query: string) {
  const cards = await db
    .select({
      id: cardsTable.id,
      front: cardsTable.front,
      back: cardsTable.back,
      createdAt: cardsTable.createdAt,
    })
    .from(cardsTable)
    .innerJoin(decksTable, eq(cardsTable.deckId, decksTable.id))
    .where(and(
      eq(decksTable.userId, userId),
      eq(cardsTable.deckId, deckId),
      or(
        ilike(cardsTable.front, `%${query}%`),
        ilike(cardsTable.back, `%${query}%`)
      )
    ))
  
  return cards
}

export async function createMultipleCards(
  deckId: number, 
  userId: string,
  cards: Array<{ front: string; back: string }>
) {
  return await db.transaction(async (tx) => {
    // Verify deck ownership first
    const [deck] = await tx
      .select()
      .from(decksTable)
      .where(and(
        eq(decksTable.id, deckId),
        eq(decksTable.userId, userId)
      ))
    
    if (!deck) {
      throw new Error("Deck not found or access denied")
    }
    
    // Insert all cards
    const newCards = await tx
      .insert(cardsTable)
      .values(cards.map(card => ({ ...card, deckId })))
      .returning()
    
    return newCards
  })
} 