<template>
  <form @submit.prevent="analyzerStore.analyze">
    <div class="flex flex-col gap-2">
      <div>
        <UILabel>
          Выберите показатель, который необходимо оптимизировать
        </UILabel>
        <FormCombobox
          value-key="display"
          :items="paramArray"
          v-model="selectedParam"
        />
      </div>
      <UIButton type="submit" class="self-start"> Проанализировать... </UIButton>
    </div>
  </form>
  <h2
    v-if="analyzerResult?.heatmap"
    class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors my-6"
  >
    Матрица корреляций
  </h2>
  <div ref="heatmapContainer" v-html="analyzerResult?.heatmap" class="bg-gray-100"></div>
  <h2
    v-if="analyzerResult?.heatmap"
    class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors my-6"
  >
    Таблица линейной регрессии
  </h2>
  <div v-html="analyzerResult?.summary" class="bg-gray-100"></div>
  <h2
    class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors my-6"
    v-if="analyzerResult?.graphs"
  >
    Графики линейной регрессии
  </h2>
  <div ref="graphsContainer" class="grid grid-cols-2">
    <div v-for="graph in analyzerResult?.graphs" v-html="graph"></div>
  </div>
</template>

<script setup lang="ts">
import { useAnalyzerStore } from "~/store/dataset";

const graphsContainer = ref<HTMLDivElement>();
const heatmapContainer = ref<HTMLDivElement>();

const analyzerStore = useAnalyzerStore();
const { selectedParam, analyzerResult, paramArray } =
  storeToRefs(analyzerStore);

watch(analyzerResult, () => {
  nextTick(() => {
    if (!graphsContainer.value) return;
    if (!heatmapContainer.value) return;
    const scriptsGraphs = graphsContainer.value.getElementsByTagName("script");
    for (var ix = 0; ix < scriptsGraphs.length; ix++) {
      console.log(scriptsGraphs[ix].text);
      eval(scriptsGraphs[ix].text);
    }
    const scriptsHeatmap = heatmapContainer.value.getElementsByTagName("script");
    for (var ix = 0; ix < scriptsHeatmap.length; ix++) {
      console.log(scriptsHeatmap[ix].text);
      eval(scriptsHeatmap[ix].text);
    }
  });
});
definePageMeta({
  layout: "lk-layout",
});
</script>
