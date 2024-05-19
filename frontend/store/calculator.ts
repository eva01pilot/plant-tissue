import type { MediumFull } from "~/api/medium"

export const useCalculatorStore = defineStore("calculator", ()=>{
  const volume = ref(0)
  const concentration = ref(0)

  const selectedMedium = ref<MediumFull>()
})
