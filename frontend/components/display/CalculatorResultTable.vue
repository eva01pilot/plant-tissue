<template>
  <div class="grid grid-cols-2 gap-10">
  <div
    v-for="(type, key) in components.components"

    class="flex flex-col"
  >
  <h1 class="mb-4 text-lg">{{ elementTypes[key] }}</h1>
    <DataTable paginator :rows="10" :value="type">
      <Column field="element.name" header="Название"></Column>
      <Column field="volume" header="Количество компонента, мг"></Column>
    </DataTable>
  </div>
  </div>
</template>

<script setup lang="ts">
import type { CalcRes } from "~/store/calculator";
import { elementTypes } from "~/store/elements";

const props = defineProps<{
  components: CalcRes;
}>();
</script>
