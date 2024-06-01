import type {AxiosInstance} from "axios"
import type { CreateMediumComponentRelationInput } from "./medium";

export interface CalculatePayload {
  medium_id: number;
  volume: number;
  concentration:number;
}

export interface CalculatorResult extends CreateMediumComponentRelationInput{
  resulting_mass: number;
}

export class Calculator {
  instance: AxiosInstance

  constructor(instance:AxiosInstance) {
    this.instance = instance
  }

  calculate(payload: CalculatePayload) {
    return this.instance.post<CalculatorResult[]>("/calculate", payload)
  }
}
