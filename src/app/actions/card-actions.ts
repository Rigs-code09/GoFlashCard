"use server"

import { auth } from "@clerk/nextjs/server"
import { createCard } from "@/db/queries"
import { createCardSchema, type CreateCardInput } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { ZodError } from "zod"

export async function createCardAction(deckId: number, data: CreateCardInput) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { 
        success: false, 
        error: "Authentication required" 
      }
    }
    
    const validatedData = createCardSchema.parse(data)
    
    const newCard = await createCard(
      deckId,
      validatedData.front,
      validatedData.back,
      userId
    )
    
    revalidatePath(`/decks/${deckId}`)
    
    return { 
      success: true, 
      data: newCard 
    }
    
  } catch (error) {
    if (error instanceof ZodError) {
      return { 
        success: false, 
        error: "Validation failed", 
        details: error.issues 
      }
    }
    
    if (error instanceof Error) {
      return { 
        success: false, 
        error: error.message
      }
    }
    
    console.error("Server action error:", error)
    return { 
      success: false, 
      error: "An unexpected error occurred" 
    }
  }
} 