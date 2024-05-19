<template>
  <table class="border-separate border-spacing-0 border-2 border-lime-900
    bg-rose-200 w-full p-4 rounded-[10px]">
  <thead>
    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
      <th v-for="header in headerGroup.headers" class="text-start">
        <FlexRender  :key="header.id"
        :render="header.column.columnDef.header" :props="header.getContext()" />

      </th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="row in table.getRowModel().rows" :key="row.id" class="mr-[-10px]">
      <td v-for="cell in row.getVisibleCells()" :key="cell.id">
        <FlexRender
          class="border-b border-b-rose-900 text-start"
          :render="cell.column.columnDef.cell"
          :props="cell.getContext()"
        />
      </td>
    </tr>
  </tbody>
  </table>
</template>

<script setup lang="ts" generic="TData, TValue">
  import { FlexRender, getCoreRowModel, useVueTable} from "@tanstack/vue-table"
  import type { ColumnDef} from "@tanstack/vue-table"
  const props = defineProps<{
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
  }>()
  const table = useVueTable({
    get data() {
      return props.data
    },
    get columns() {
      return props.columns
    },
    getCoreRowModel: getCoreRowModel()
  })
</script>
