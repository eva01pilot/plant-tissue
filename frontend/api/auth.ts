import type {AxiosInstance} from "axios"
export type LoginPayload = {username: string, password: string}
export type SignupPayload = LoginPayload & {password_repeat:string}
export class Auth {
  instance: AxiosInstance
  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  async login(payload: LoginPayload) {
    return this.instance.post('/auth/login', payload)
  }

  async signup(payload: SignupPayload) {
    return this.instance.post('/auth/signup', payload)
  }
}
