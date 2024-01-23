import { middleware } from "../trpc";
import prisma from "../prisma/prisma-client";
import { TRPCError } from "@trpc/server";

export const isAdmin = middleware(async (opts) => {
  const userID = opts.ctx.userID
  const user = await prisma.user.findFirst({
    where: {
      id: userID
    },
    select: {
      role: true
    }
  })
  if (user?.role === 'ADMIN') {
    return opts.next({ ctx: { userID } })
  }
  else {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
})
