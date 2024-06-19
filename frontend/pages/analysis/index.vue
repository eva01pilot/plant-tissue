<template>
  <div ref="accordion">
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
        <UIButton type="submit" class="self-start">
          Проанализировать...
        </UIButton>
      </div>
    </form>
    <Accordion type="single" collapsible v-model="accordionValue">
    <AccordionItem value="corr_matrix">
    <AccordionTrigger>Матрица корреляций</AccordionTrigger>
        <AccordionContent forceMount v-show="accordionValue==='corr_matrix'">
          <div
            v-html="analyzerResult?.corr_matrix"
            ref="corr_matrix"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="linear">
        <AccordionTrigger>Линейная регрессия</AccordionTrigger>
        <AccordionContent forceMount v-show="accordionValue==='linear'">
          <div v-html="analyzerResult?.linear_regression.summary" />
          <div ref="linear_graphs">
            <div
              v-for="graph in analyzerResult?.linear_regression.graphs"
              v-html="graph"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="neural_net">
        <AccordionTrigger>Нейронная сеть</AccordionTrigger>
        <AccordionContent forceMount v-show="accordionValue==='neural_net'">
          <div v-html="analyzerResult?.neural_net.figure" ref="neural_net" />
          <div>
            r2:{{ analyzerResult?.neural_net.r2 }} mse:{{
              analyzerResult?.neural_net.mse
            }}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="decision_tree">
        <AccordionTrigger>Дерево решений</AccordionTrigger>
        <AccordionContent forceMount  v-show="accordionValue==='decision_tree'">
          <div
            v-html="analyzerResult?.decision_tree.figure"
            ref="decision_tree"
          />
          <div>
            r2:{{ analyzerResult?.decision_tree.r2 }} mse:{{
              analyzerResult?.decision_tree.mse
            }}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="knn">
        <AccordionTrigger>КНН</AccordionTrigger>
        <AccordionContent forceMount v-show="accordionValue==='knn'">
          <div v-html="analyzerResult?.knn.figure" ref="knn" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="random_forest">
        <AccordionTrigger>Случайный лес</AccordionTrigger>
        <AccordionContent forceMount v-show="accordionValue==='random_forest'">
          <div
            v-html="analyzerResult?.random_forest.figure"
            ref="random_forest"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { useAnalyzerStore, useDatasetStore } from "~/store/dataset";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const corr_matrix = ref<HTMLDivElement>();
const linear_graphs = ref<HTMLDivElement>();
const neural_net = ref<HTMLDivElement>();
const decision_tree = ref<HTMLDivElement>();
const knn = ref<HTMLDivElement>();
const random_forest = ref<HTMLDivElement>();
const lasso = ref<HTMLDivElement>();
const ridge = ref<HTMLDivElement>();
const heatmapContainer = ref<HTMLDivElement>();

const accordion = ref<HTMLDivElement>();

const datasetStore = useDatasetStore();

const analyzerStore = useAnalyzerStore();
const { selectedParam, analyzerResult, paramArray } =
  storeToRefs(analyzerStore);

const accordionValue = ref("");

watch(analyzerResult, () => {
  nextTick(() => {
    nextTick(() => {
      if (!accordion.value) return;
      const scriptsGraphs = accordion.value.getElementsByTagName("script");
      console.log(scriptsGraphs);
      for (var ix = 0; ix < scriptsGraphs.length; ix++) {
        evalAsync(scriptsGraphs[ix].text);
      }
    });
  });
});

const evalAsync = async (txt: string) => eval(txt);
definePageMeta({
  layout: "lk-layout",
});
</script>
