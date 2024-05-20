import type { inferRouterOutputs } from "@trpc/server";
import { mediumsStore, type Medium } from "./mediums"
import type { AppRouter } from "../../backend";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type CalcRes = RouterOutput['calculator']['calculate']
export const useCalculatorStore = defineStore('calculator', ()=>{
  const step = ref(0)
  const newGroupName=ref("")
  const concentration = ref(0)
  const volume = ref(0)
  const medStore = mediumsStore()
  const {mediums} = storeToRefs(medStore)
  const {$trpc} = useNuxtApp()
  const calculatorResult = ref<CalcRes>()
  type MediumGrouped = {
    name: string,
    description: string,
    id: number;
    components: {
      [k in 'VITAMINS'|'MACROELEMENTS'|'MICROELEMENTS'|string]: Medium['components']
    }
  }
  const groupComponentsInMedium = (medium: Medium):MediumGrouped => {
    const components = medium.components
    const groupedComponents = Object.groupBy(components, ({element})=>element?.type as 'MICROELEMENT'|'MACROELEMENT'|'VITAMIN')

    return {
      name: medium.name,
      description: medium.description,
      id: medium.id,
      components: groupedComponents,
    }
  }

  const groupedMediums = computed(()=>{
    return mediums.value.map((med:any)=>groupComponentsInMedium(med))
  })

  const addGroup = () => {
    selectedMedium.value.components[newGroupName.value] = []
  }

  const calculate = async() => {
    calculatorResult.value =await $trpc.calculator.calculate.mutate({...selectedMedium.value, volume: volume.value, concentration: concentration.value})
  }
  const selectedMedium = ref(groupedMediums.value[0])
  return {selectedMedium, groupedMediums, step, addGroup, newGroupName, concentration, volume, calculate, calculatorResult}
})
