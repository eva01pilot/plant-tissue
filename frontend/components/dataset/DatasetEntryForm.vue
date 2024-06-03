<template>
  <form class="flex flex-col gap-2" @submit.prevent="datasetFormStore.submit">
    <div>
      <UILabel>Выберите питательную среду</UILabel>
      <FormCombobox v-model="selectedMedium" :items="mediums" value-key="name" />
    </div>
    <div>
      <UILabel>Высота растения, см</UILabel>
      <UIInput type="number" step="0.01" placeholder="70 см" v-model="metrics.plant_height" />
    </div>
    <div>
      <UILabel>Количество настоящих листьев</UILabel>
      <UIInput placeholder="50" type="number" step="1" v-model="metrics.true_leaves_count" />
    </div>
    <div>
      <UILabel>Количество боковых побегов</UILabel>
      <UIInput placeholder="30" type="number" step="1" v-model="metrics.side_shoots_count" />
    </div>
    <div>
      <UILabel>Количество узлов</UILabel>
      <UIInput placeholder="10" type="number" step="1" v-model="metrics.node_count" />
    </div>
    <div>
      <UILabel>Коэффициент размножения</UILabel>
      <UIInput placeholder="100000" type="number" step="1" v-model="metrics.reproduction_coefficient" />
    </div>
    <div>
      <UILabel>Содержание хлорофилла, %</UILabel>
      <UIInput placeholder="0.3%" type="number" step="0.01" v-model="metrics.chlorophyll_percent" />
    </div>
    <UIButton type="submit">
      Добавить запись
    </UIButton>
  </form>

</template>

<script setup lang="ts">
import { useDatasetFormStore } from '~/store/dataset';
import { useMediumStore } from '~/store/mediums';

const datasetFormStore = useDatasetFormStore()
const mediumStore = useMediumStore()
const { dataset, mediums, metrics, selectedMedium } = storeToRefs(datasetFormStore)

onMounted(() => {
  if (!mediums.value.length) {
    mediumStore.fetchMediums()
  }
})
</script>
