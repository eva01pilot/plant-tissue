import type {AxiosInstance} from "axios"

export interface CalculatePayload {
  medium_id: number;
  volume: number;
  concentration:number;
}

export class Calculator {
  instance: AxiosInstance

  constructor(instance:AxiosInstance) {
    this.instance = instance
  }

  calculate(payload: CalculatePayload) {
    return this.instance.post("/calculate", payload)
  }
}
