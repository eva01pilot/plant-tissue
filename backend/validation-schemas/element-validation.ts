import { z } from "zod";

export const createElementSchema = z.object({
  name: z.string(),
  formula: z.string(),
  type: z.enum(['MICROELEMENT', 'MACROELEMENT', 'VITAMIN']),
})

export const updateElementSchema = z.object({
  name: z.string(),
  formula: z.string(),
  id: z.number(),
  type: z.enum(['MICROELEMENT', 'MACROELEMENT', 'VITAMIN']),
}) 

export const deleteElementSchema = z.object({
  id: z.number()
})

export const getElementsSchema = z.object({
  page: z.number(),
  limit: z.number(),
})

export type createElementInput = z.infer<typeof createElementSchema>
export type getElementsInput = z.infer<typeof getElementsSchema>
export type deleteElementInput = z.infer<typeof deleteElementSchema>
export type updateElementInput = z.infer<typeof updateElementSchema>
