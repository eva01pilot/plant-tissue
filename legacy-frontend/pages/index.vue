<template>
  <Steps
    :model="items"
    v-model:activeStep="step"
    class="fixed bottom-4 w-full left-0"
    :readonly="false"
  />
  <div class="flex justify-center items-center h-full w-full flex-row gap-4">
    <template v-if="step === 0">
      <Dropdown
        :options="groupedMediums"
        optionLabel="name"
        v-model="selectedMedium"
      />
      <Button severity="success" @click="step = 1">Далее</Button>
    </template>
    <template v-if="step === 1">
      <div class="flex flex-col gap-10">
        <div class="flex flex-row gap-4">
          <InputText v-model="newGroupName" />
          <Button
            @click="calcStore.addGroup"
            severity="success"
            label="Добавить группу"
          />
        </div>
        <div class="grid grid-cols-2 gap-8">
          <div
            v-for="(value, group) in selectedMedium.components"
            class="border p-4"
          >
            <label class="p-label mb-4 font-medium block">{{
              elementTypes[
                group as "MICROELEMENT" | "MACROELEMENT" | "VITAMIN"
              ] ?? group
            }}</label>
            <draggable
              :list="selectedMedium.components[group]"
              group="elements"
              class="flex flex-col gap-2 items-start mb-4"
            >
              <template #item="{ element }">
                <button class="bg-gray-200 w-full p-2 text-start
                  hover:bg-gray-100 duration-300 transition-all">{{ element.element.name }}</button>
              </template>
            </draggable>
            <Button severity="danger" label="Удалить группу"
              :disabled="!!selectedMedium.components[group].length"
              @click="deleteGroup(group)" />
          </div>
        </div>
        <Button label="Далее" @click="step = 2" />
      </div>
    </template>
    <template v-if="step === 2">
      <div class="flex flex-col gap-4">
        <label for="">Введите концентрацию маточного раствора</label>
        <InputNumber
          v-model="concentration"
          placeholder="Введите концентрацию маточного раствора"
        />
        <label for="">Введите объём маточного раствора</label>
        <InputNumber
          v-model="volume"
          placeholder="Введите объём маточного раствора"
        />
        <Button label="Далее" @click="calculate" />
      </div>
    </template>
    <template v-if="step === 3">
      <CalculatorResultTable :components="calculatorResult" v-if="calculatorResult" />
    </template>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import Steps from "primevue/steps";
import { useCalculatorStore } from "~/store/calculator";
import { elementTypes } from "~/store/elements";
import { mediumsStore } from "~/store/mediums";
const calcStore = useCalculatorStore();
const {
  selectedMedium,
  groupedMediums,
  step,
  newGroupName,
  concentration,
  volume,
  calculatorResult
} = storeToRefs(calcStore);
import Listbox from "primevue/listbox";
import draggable from "vuedraggable";
import InputNumber from "primevue/inputnumber";
import CalculatorResultTable from "~/components/display/CalculatorResultTable.vue";
onMounted(() => {
  mediumsStore().getAllMediums();
});

const deleteGroup = (group: string) =>{
  delete selectedMedium.value.components[group]
}

const calculate = async() => {
  step.value = 3
  const first = volume.value / concentration.value
  calcStore.calculate()
}

const items: { label: string }[] = [
  {
    label: "Выберите питательную среду",
  },
  {
    label: "Проверьте композицию питательной среды",
  },
  {
    label: "Введите концентрацию и объём маточного раствора",
  },
  {
    label: "Результат",
  },
];
definePageMeta({
  layout: "app-layout",
  middleware: 'is-logged-in'
});
</script>
