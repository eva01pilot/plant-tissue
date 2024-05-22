<template>
  <form @submit.prevent="calcStore.calculate">
    <FormCombobox v-model="selectedMedium" valueKey="name" :items="mediums"/>
    <UIInput type="number" step="0.01" v-model="concentration"
    placeholder="Концентрация маточного раствора"/>
    <UIInput type="number" step="0.01" v-model="volume"
    placeholder="Объем маточного раствора"/>
  </form>
</template>

<script setup lang="ts">
import { useCalculatorStore } from "~/store/calculator";
import { useMediumStore } from "~/store/mediums";

const calcStore = useCalculatorStore();
const { selectedMedium, volume, concentration } = storeToRefs(calcStore);

const mediumStore = useMediumStore();
const { mediums } = storeToRefs(mediumStore);
</script>
