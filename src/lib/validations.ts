import { z } from "zod"

export const createCardSchema = z.object({
  front: z.string()
    .min(1, "Front content is required")
    .max(1000, "Front content must be less than 1000 characters"),
  back: z.string()
    .min(1, "Back content is required")
    .max(1000, "Back content must be less than 1000 characters"),
})

export const createDeckSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
})

export const updateDeckSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .optional(),
  description: z.string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
})

export const updateCardSchema = z.object({
  front: z.string()
    .min(1, "Front content is required")
    .max(1000, "Front content must be less than 1000 characters")
    .optional(),
  back: z.string()
    .min(1, "Back content is required")
    .max(1000, "Back content must be less than 1000 characters")
    .optional(),
})

// Export TypeScript types from schemas
export type CreateCardInput = z.infer<typeof createCardSchema>
export type CreateDeckInput = z.infer<typeof createDeckSchema>
export type UpdateDeckInput = z.infer<typeof updateDeckSchema>
export type UpdateCardInput = z.infer<typeof updateCardSchema> 