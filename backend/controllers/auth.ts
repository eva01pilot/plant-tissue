import jsonWebToken from '../helpers/jwt-helper.js'
import crypt from '../helpers/crypt-hashing.js'
import { loginInput,signUpInput, signupSchema} from "../validation-schemas/auth-validation.js"
import { createUserHandler, getUsersHandler } from "../services/user.js"
import { TRPCError } from "@trpc/server"
import { z } from 'zod'
import { Context } from '../trpc.js'

export default class AuthController {

  static async login(input:loginInput, ctx: Context) {    
    console.log(input.username)
    const userResult = await getUsersHandler({username:input.username},{id:true,avatar:true,role:true,password_hash:true,username:true})
    const user = userResult[0]
    console.log(user)
    if(!user) {
      throw new TRPCError({code: 'UNAUTHORIZED', message: 'Неправильный логин или пароль'})
    }
    const isValid = await crypt.compare(input.password, user.password_hash)
    console.log(isValid)
    if (!isValid) {
      throw new TRPCError({code: 'UNAUTHORIZED', message: 'Неправильный логин или пароль'})
    }
    ctx.res.cookie('access_token', jsonWebToken.sign(user.id), {
      httpOnly: true
    })
    return user
  }


  static async signUp(input:z.infer<typeof signupSchema>, ctx: Context) {
    const { password } = input 
    const passwordHashed = await crypt.hash(password)
    const existingUser = await getUsersHandler({username: input.username}, {username:true, password_hash: true}) 
    if(existingUser.length) {
      throw new TRPCError({code: 'BAD_REQUEST', message: 'Имя пользователя занято'})
    }
    const user = await createUserHandler({username:input.username,avatar:input.avatar, password_hash: passwordHashed, role: 'USER' })
    ctx.res.cookie('access_token', jsonWebToken.sign(user.id), {
      httpOnly: true
    })
    return user
  }

  static async logout(ctx: Context) {
    ctx.res.cookie('access_token', '');
  }
}
