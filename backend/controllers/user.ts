import { Context } from "../trpc.js";
import { findUniqueUser, updateUser } from "../services/user.js";
import { userUpdateInput } from "../validation-schemas/user.js";

export default class UserController {
  static async getMe(ctx:Context) {
    const userID = ctx.userID
    const user = await findUniqueUser({id: userID}, {id: true, username: true, role: true, avatar: true, password_hash: false})

    return user
  }

  static async update(input: userUpdateInput, ctx: Context) {
    const updateRes = await updateUser({id: ctx.userID}, input, {username:true, avatar:true,role:true})
    return updateRes
  }

}

