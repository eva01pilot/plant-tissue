import { Context } from '../trpc.js'
import { calculateInput } from '../validation-schemas/calculator-validation.js'
export default class CalculatorController {
  static async calculate(input: calculateInput,ctx:Context) {
    const iters = input.volume * input.concentration
    const components = Object.keys(input.components)
      .map((comp)=>({
        [comp]: input.components[comp].map((c)=>({...c, volume: c.mg_per_liter * iters})),
      }))
    return {
        ...input,
        components:components.reduce((acc, curr)=>Object.assign(acc,curr), {})
    }
  }
}

