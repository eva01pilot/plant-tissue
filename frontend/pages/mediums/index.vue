<template>
  <CommonDatatable :data="mediums" :columns="mainColumns"/>
</template>

<script setup lang="ts">
import { createColumnHelper, type ColumnDef } from '@tanstack/vue-table';
import clsx from 'clsx';
import type { ComponentFull, ElementSign } from '~/api/component';
import type { MediumComponent, MediumFull } from '~/api/medium';
import { useComponentsStore } from '~/store/components';
import { useMediumStore } from '~/store/mediums';


const columnHelper = createColumnHelper<MediumFull>()

const mediumStore = useMediumStore()
const { mediums } = storeToRefs(mediumStore)

onMounted(()=>{
  mediumStore.fetchMediums()
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
  columnHelper.accessor("description", {
    cell: (props)=>props.getValue(),
    header: 'Описание'
  }),
  columnHelper.accessor("thumbnail", {
    cell: (props)=>h('img', {src:props.getValue(), class: clsx(`h-10 w-20
    object-contain border-b-0`)}),
    header: 'Обложка'
  }),
  columnHelper.accessor("components", {
    cell:
    //@ts-ignore
    (props)=>h(CommonDatatable, {data:props.getValue(), columns:additional}),
    header: 'Состав'
  }),
] as ColumnDef<MediumFull>[]

const additionalColumnHelper = createColumnHelper<MediumComponent>()
const additional = [
  additionalColumnHelper.accessor('component', {
    cell: (props)=>props.getValue(),
    header: '#'
  }),
  additionalColumnHelper.accessor('name', {
    cell: (props)=>props.getValue(),
    header: 'Название'
  }),
  additionalColumnHelper.accessor('formula', {
    cell: (props)=>props.getValue(),
    header: 'Формула'
  }),
  additionalColumnHelper.accessor('mass', {
    cell: (props)=>props.getValue(),
    header: 'Мг/л'
  }),
] as ColumnDef<MediumComponent>[]
definePageMeta({
  layout: "lk-layout"
})
</script>
