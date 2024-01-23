import { z } from 'zod'
import { type Request, type Response, type NextFunction, request } from 'express'
import jsonWebToken from '../helpers/jwt-helper.js'
import { middleware } from '../trpc.js'
import { TRPCError } from '@trpc/server'

export const isAuth = middleware(async(opts)=>{
  const cookieSchema = z.object({
    access_token: z.string()
  })
  const {req,res} = opts.ctx
  const isValidCookieObject = cookieSchema.parse(req.cookies)
  let userID:string|boolean = false
  if (isValidCookieObject) {
    const access_token: string = req.cookies['access_token']
    console.log(access_token)
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
