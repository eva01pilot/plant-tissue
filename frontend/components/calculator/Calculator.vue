<template>
  <form @submit.prevent="calcStore.calculate" class="flex flex-col gap-2 py-4">
    <Label for="medium">
      Питательная среда
    </Label>
    <FormCombobox id="medium" v-model="selectedMedium" valueKey="name" :items="mediums"/>
    <Label for="concentration">
      Концентрация
    </Label>
    <UIInput id="concentration" type="number" step="0.01" v-model="concentration"
    placeholder="Концентрация маточного раствора"/>
    <Label for="volume">
      Объем маточного раствора, л
    </Label>
    <UIInput type="number" id="volume" step="0.01" v-model="volume"
    placeholder="Объем маточного раствора"/>
    <UIButton type="submit">
      Рассчитать
    </UIButton>
  </form>
  <DisplayDatatable :data="calculatorResult" :columns v-if="calculatorResult.length"/>
</template>

<script setup lang="ts">
import { createColumnHelper, type ColumnDef } from "@tanstack/vue-table";
import type { CalculatorResult } from "~/api/calculator";
import { useCalculatorStore } from "~/store/calculator";
import { useMediumStore } from "~/store/mediums";
import {Label} from "@/components/ui/label"

const calcStore = useCalculatorStore();
const { selectedMedium, volume, concentration, calculatorResult } = storeToRefs(calcStore);

const mediumStore = useMediumStore();
const { mediums } = storeToRefs(mediumStore);

const columnHelper = createColumnHelper<CalculatorResult>()
const columns = [
  columnHelper.accessor("component.component_formula", {
    header: 'Компонент',
    cell: (props)=>props.getValue()
  }),
  columnHelper.accessor("resulting_mass", {
    header: 'Количество, мг',
    cell: (props)=>props.getValue()
  }),

] as ColumnDef<CalculatorResult>[]

</script>
