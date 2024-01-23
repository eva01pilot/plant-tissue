import { z } from "zod";

export const userUpdateSchema = z.object({
  avatar: z.string(),
})

export type userUpdateInput = z.infer<typeof userUpdateSchema>
