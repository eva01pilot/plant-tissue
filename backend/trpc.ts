import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import jsonWebToken from './helpers/jwt-helper';
import { z } from 'zod';
import prisma from './prisma/prisma-client';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({req,res,userID:-1}); 

interface CustomContext {
  userID: number,
}

export type Context = inferAsyncReturnType<typeof createContext>;


export const t = initTRPC.context<Context>().create();
export const middleware = t.middleware
export const isAuth = middleware(async(opts)=>{
  const cookieSchema = z.object({
    access_token: z.string()
  })
  const {req,res} = opts.ctx
  console.log(req.cookies)
  const isValidCookieObject = cookieSchema.parse(req.cookies)
  let userID:string|boolean = false
  if (isValidCookieObject) {
    const access_token: string = req.cookies['access_token']
    userID = jsonWebToken.verify(access_token)
  }
  else throw new TRPCError({code:'UNAUTHORIZED'})

  if(!userID) throw new TRPCError({code: 'UNAUTHORIZED'})
    return opts.next({ctx:{
      userID:+userID,
      req,
      res
    }})
})
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
export const userProtectedProcedure = t.procedure
.use(isAuth)
export const adminProtectedProcedure = t.procedure
.use(isAuth).use(isAdmin)
