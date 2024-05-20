import { z } from "zod";

export const cookieSchema = z.object({
  access_token: z.string()
})

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

export const signupSchema = z.object({
  username: z.string().max(20).min(5),
  password: z.string(),
  avatar: z.string(),
})

export const signUpWithHash = z.intersection(signupSchema, z.object({password_hash:z.string()}))

export type signUpInput = z.infer<typeof signUpWithHash>
export type loginInput = z.infer<typeof loginSchema>

