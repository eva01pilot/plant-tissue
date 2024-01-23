import { z } from "zod";
export const componentSchema = z.object({
  mg_per_liter: z.number(),
  element_id: z.number(),
  concentration: z.number(),
  id: z.optional(z.number())
})
export const createMediumSchema = z.object({
  components: z.array(componentSchema),
  name: z.string(),
  description: z.string(),
})

export const updateMediumSchema = z.object({
  components: z.array(componentSchema),
  name: z.string(),
  description: z.string(),
  id: z.number()
})

export const getMediumSchema = z.object({
  medium_id: z.number()
})

export const deleteMediumSchema = z.object({
  medium_id: z.number()
}) 

export type createMediumInput = z.infer<typeof createMediumSchema>
export type updateMediumInput = z.infer<typeof updateMediumSchema>
export type getMediumInput = z.infer<typeof getMediumSchema>
export type deleteMediumInput = z.infer<typeof deleteMediumSchema>
