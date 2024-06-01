<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createColumnHelper, type ColumnDef } from "@tanstack/vue-table";
import type { MediumComponent, MediumFull } from "~/api/medium";
import { useComponentsStore } from "~/store/components";
import { ScrollArea } from "@/components/ui/scroll-area";

const props = defineProps<{
  medium: MediumFull;
}>();

const columnHelper = createColumnHelper<MediumComponent>();

const componentStore = useComponentsStore();
const { componentTypes, components } = storeToRefs(componentStore);

onMounted(() => {
  componentStore.fetchComponentTypes();
});

const mainColumns = [
  columnHelper.accessor("component.component_formula", {
    cell: (props) => props.getValue(),
    header: "Формула",
  }),
  columnHelper.accessor("component.type_id", {
    cell: (props) =>
      componentTypes.value.find((el) => el.id === props.getValue())?.name_rus,
    header: "Тип",
  }),
  columnHelper.accessor("mg_per_liter", {
    cell: (props) => props.getValue(),
    header: "Мг/л",
  }),
] as ColumnDef<MediumComponent>[];
</script>

<template>
  <Card class="w-96 flex flex-col h-[32rem]">
    <CardHeader class="relative bg-transparent bg-white bg-opacity-50">
      <img
        :src="medium.thumbnail"
        class="w-full aspect-video rounded-xl object-cover border z-0 shadow-inner"
      />
      <CardTitle class="text-lg relative z-10">{{ medium.name }}</CardTitle>
    </CardHeader>
    <CardContent class="flex-grow flex flex-col">
      <ScrollArea class="flex-grow basis-32  rounded-md border p-4 [&>div]:!block">
        <div class="w-full">
          <CardTitle class="mb-2">Описание</CardTitle>
          <CardDescription class="overflow-auto break-words">
          {{
            medium.description
          }}
          </CardDescription>
        </div>
      </ScrollArea>
    </CardContent>
    <CardFooter class="">
      <MiscPopup>
        <template #trigger>
          <UIButton> Открыть таблицу компонентов </UIButton>
        </template>
        <template #content>
          <DisplayDatatable :columns="mainColumns" :data="medium.components" />
        </template>
      </MiscPopup>
    </CardFooter>
  </Card>
</template>
