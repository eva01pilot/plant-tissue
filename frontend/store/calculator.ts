import type { MediumFull } from "~/api/medium";
import { useMediumStore } from "./mediums";
import type { CalculatorResult } from "~/api/calculator";

export const useCalculatorStore = defineStore("calculator", () => {
  const { $api, $notify } = useNuxtApp();
  const volume = ref(0);
  const concentration = ref(0);

  const mediumStore = useMediumStore()
  const {mediums} = storeToRefs(mediumStore)
  mediumStore.fetchMediums()
  const selectedMedium = ref<MediumFull>(mediums.value[0]);

  const calculatorResult = ref<CalculatorResult[]>([])

  const calculate = async () => {
    try {
      const res = await $api.calculator.calculate({
        concentration: concentration.value,
        volume: volume.value,
        medium_id: selectedMedium.value?.id ?? 0,
      });
      calculatorResult.value = res.data
    } catch (e) {
        $notify("Не удалось рассчитать состав")

    }
  };

  return { volume, concentration, selectedMedium, calculate, calculatorResult };
});
