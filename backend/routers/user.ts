import { userProtectedProcedure} from '../trpc'
import { getAllSchema } from '../validation-schemas/common'
import UserController from '../controllers/user'
import { userUpdateSchema } from '../validation-schemas/user'
import { t } from '../trpc'

export const userRouter = t.router({
  getMe: userProtectedProcedure
    .query(({ctx})=>UserController.getMe(ctx)),
  updateUser: userProtectedProcedure
    .input(userUpdateSchema)
    .mutation(({input, ctx})=>UserController.update(input, ctx)),
})
