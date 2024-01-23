<template>
  <CommonCard>
    <template #title>
      {{ props.medium.name }}
    </template>
    <template #description>
      {{props.medium.description}}
    </template>
    <template #content>
      <CommonDataTable
        :page-size="10"
        :columns="columnDefs"
        :data="componentData"
      />
    </template>
    <template v-if="deletable" #footer>
      <UiButton @click="emit('delete')">Удалить</UiButton>
    </template>
  </CommonCard>
</template>

<script setup lang="tsx">
import type { MediumComponentTable, MediumTable } from "@/lib/table_interfaces";
import type { ColumnDef } from "@tanstack/vue-table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const props = defineProps<{
  medium: MediumTable;
  componentData: MediumComponentTable[];
  deletable: boolean
}>();

const emit=defineEmits(['delete'])

const columnDefs: ColumnDef<MediumComponentTable>[] = [
  {
    header: "Элемент",
    accessorKey: "element",
    cell: ({ row }) => {
      return h(HoverCard, [
        h(HoverCardTrigger, {
          innerHTML: !!row.original.element && `${row.original.element.name}`,
        }),
        h(HoverCardContent, [
              <div class="flex flex-col">
                <span>{row.original.element?.name}</span>
                <span>{row.original.element?.type}</span>
                <span innerHTML={formatChemString(row.original.element?.formula as string)}></span>
              </div>
        ]),
      ]);
    },
  },
  {
    header: 'Мг/л',
    accessorKey: "mg_per_liter",
  },
  {
    header: 'μ',
    accessorKey: "concentration",
  }
];
</script>
