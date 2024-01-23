import { z } from "zod";

export const getAllSchema = z.object({
  page: z.number(),
  limit: z.number(),
})

export type getAllInput = z.infer<typeof getAllSchema>
