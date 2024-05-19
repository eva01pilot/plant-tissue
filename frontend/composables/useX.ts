import { ref } from "vue"

export const useX = () =>{
  const logg = ref("")
  return {logg}
}
