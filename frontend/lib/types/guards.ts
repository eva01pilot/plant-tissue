import type {CommonEvent} from "./common"
export const targetIsFileInput = <T>(e:Event): e is CommonEvent<T> =>{
  if(!e.target) return false
  if('files' in e.target) return true
  return false
}
