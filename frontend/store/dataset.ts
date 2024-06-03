import type { MediumFull } from "~/api/medium";
import { useMediumStore } from "./mediums";
import type { DatasetFull, DatasetParams } from "~/api/dataset";

export const useDatasetFormStore = defineStore("dataset-form", () => {
  const { $api, $notify } = useNuxtApp();
  const mediumStore = useMediumStore();
  const datasetStore = useDatasetStore();
  const { mediums } = storeToRefs(mediumStore);
  const { dataset } = storeToRefs(datasetStore);

  const selectedMedium = ref<MediumFull>(mediums.value[0]);
  const metrics = ref<DatasetParams>({
    node_count: 0,
    plant_height: 0,
    side_shoots_count: 0,
    true_leaves_count: 0,
    chlorophyll_percent: 0,
    reproduction_coefficient: 0,
  });

  const submit = async () => {
    try {
      await $api.dataset.createEntry({
        ...metrics.value,
        medium_id: selectedMedium.value.id,
      });
    } catch (e) {
      $notify("Не получилось создать запись")
    }
  };

  return { selectedMedium, metrics, mediums, dataset, submit };
});

export const useDatasetStore = defineStore("dataset", () => {
  const { $api, $notify } = useNuxtApp();

  const dataset = ref<DatasetFull[]>([]);
  const file = ref<File>()

  const importDataset = async() => {
    try {
      if(!file.value) {
        throw new Error()
      }
      await $api.dataset.importDataset(file.value)

    } catch(e) {
      $notify("Не удалось импортировать датасет")
    }
  }

  const fetchDataset = async () => {
    dataset.value = (await $api.dataset.getDataset()).data;
  };
  return { dataset, fetchDataset, file, importDataset };
});
