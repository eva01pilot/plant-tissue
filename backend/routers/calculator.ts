
import { userProtectedProcedure} from '../trpc'
import { t } from '../trpc'
import { calculateSchema } from '../validation-schemas/calculator-validation'
import CalculatorController from '../controllers/calculator'

export const calculatorRouter = t.router({
  calculate: userProtectedProcedure
    .input(calculateSchema)
    .mutation(({input, ctx})=>CalculatorController.calculate(input, ctx)),

})
