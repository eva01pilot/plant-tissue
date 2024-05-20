<template>
  <CommonDatatable :data="components" :columns="mainColumns"/>


</template>

<script setup lang="ts">
import { createColumnHelper, type ColumnDef } from '@tanstack/vue-table';
import type { ComponentFull, ElementSign } from '~/api/component';
import { useComponentsStore } from '~/store/components';


const columnHelper = createColumnHelper<ComponentFull>()

const componentStore = useComponentsStore()
const { componentTypes, components } = storeToRefs(componentStore)

onMounted(()=>{
  componentStore.fetchComponentTypes()
  componentStore.fetchComponents()
})

const mainColumns = [
  columnHelper.accessor("id", {
    cell: (props)=>props.getValue(),
    header: '#'
  }),
  columnHelper.accessor("name", {
    cell: (props)=>props.getValue(),
    header: 'Название'
  }),
  columnHelper.accessor("formula", {
    cell: (props)=>props.getValue(),
    header: 'Формула'
  }),
  columnHelper.accessor("type_id", {
    cell:
    (props)=>componentTypes.value.find((el)=>el.id===props.getValue())?.name,
    header: 'Тип'
  }),
  columnHelper.accessor("elements", {
    cell:
    //@ts-ignore
    (props)=>h(CommonDatatable, {data:props.getValue(), columns: additional}),
    header: 'Состав'
  }),
] as ColumnDef<ComponentFull>[]

const additionalColumnHelper = createColumnHelper<ElementSign>()
const additional = [
  additionalColumnHelper.accessor('sign', {
    cell: (props)=>props.getValue(),
    header: 'Символ'
  }),
  additionalColumnHelper.accessor('quantity', {
    cell: (props)=>props.getValue(),
    header: 'Кол-во'
  }),
] as ColumnDef<ElementSign>[]
definePageMeta({
  layout: "lk-layout"
})
</script>
