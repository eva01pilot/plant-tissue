<template>
  <DataTable :value="components" paginator :rows="10"  >
    <Column field="name" header="Название"></Column>
    <Column field="formula" header="Формула"></Column>
    <Column field="typeName" header="Тип"></Column>
  </DataTable>
</template>

<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import type { ElementTable } from "~/store/elements";

const props = defineProps<{
  components: ElementTable[];
}>();
</script>
