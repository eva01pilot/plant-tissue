import { z } from "zod";

export const getAllSchema = z.object({
  page: z.number(),
  limit: z.number(),
})

export const searchElementsSchema = z.object({
  search: z.string(),
})

export type getAllInput = z.infer<typeof getAllSchema>
export type searchElementsInput = z.infer<typeof searchElementsSchema>
