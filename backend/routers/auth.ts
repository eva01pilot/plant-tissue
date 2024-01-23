import { userProtectedProcedure} from '../trpc'
import { loginSchema, signupSchema } from '../validation-schemas/auth-validation'
import AuthController from '../controllers/auth'
import { t } from '../trpc'
export const authRouter = t.router({
  login: t.procedure
    .input(loginSchema)
    .mutation(({input, ctx})=>AuthController.login(input, ctx)),
  signUp: t.procedure
    .input(signupSchema)
    .mutation(({input, ctx})=>AuthController.signUp(input, ctx)),
  logout: userProtectedProcedure
    .mutation(({ctx})=>AuthController.logout(ctx))
})
