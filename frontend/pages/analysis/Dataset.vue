<template>
  <div class="grid grid-cols-6 gap-4">
    <div class="col-span-full xl:col-span-1">
      <UIButton @click="loadFile"> Импорт датасета </UIButton>
      <input
        type="file"
        class="invisible"
        @change="handleFileUpload"
        ref="fileUpload"
        accept=".csv"
      />
      <UISeparator class="my-2" />
      <DatasetEntryForm />
    </div>
    <div class="col-span-full xl:col-span-5">
      <DisplayDatatable :columns v-if="dataset" :data="dataset" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createColumnHelper, type ColumnDef } from "@tanstack/vue-table";
import type { DatasetFull } from "~/api/dataset";
import { useDatasetStore } from "~/store/dataset";

const datasetStore = useDatasetStore();
const { file, dataset } = storeToRefs(datasetStore);
const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files?.length) {
    file.value = files[0];
    datasetStore.importDataset();
  }
};
const loadFile = () => {
  fileUpload.value?.click();
};

const columnHelper = createColumnHelper<DatasetFull>();

onMounted(async() => {
  await datasetStore.fetchDataset();
  columns.value = Object.keys(dataset.value[0]).map((key) => {
    return columnHelper.accessor(key, {
      header: () => key,
      cell: (props) => props.getValue(),
    });
  }) as ColumnDef<DatasetFull>[];
});

const columns = ref<ColumnDef<DatasetFull>[]>([]);

const fileUpload = ref<HTMLButtonElement>();
definePageMeta({
  layout: "lk-layout",
});
</script>
