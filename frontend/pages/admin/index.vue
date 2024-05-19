<template>
  <CommonTab :tabs v-model="activeTab">
    <template #mediumForm>
        <AdminCreateMediumForm class="overflow-scroll h-full"/>
    </template>
    <template #componentForm>
        <AdminCreateComponentForm />
    </template>
  </CommonTab>
</template>

<script setup lang="ts">
const windows = [
  //  { name: "componentForm", title: "Форма компонентов" } as const,
  { name: "mediumForm", title: "Форма сред" } as const,
  //  { name: "componentTable", title: "Таблица компонентов" } as const,
  //  { name: "mediumTable", title: "Таблица сред" } as const,
];

const windowsRef = ref<typeof windows>(windows);

const handleClose = (name: string) => {
  windowsRef.value = windowsRef.value.filter((el) => el.name !== name);
};

const tabs = [{title:"Форма сред" as const, name:"mediumForm"}, {title:"Форма компонентов" as
const, name:"componentForm"}];
const activeTab = ref(tabs[0].name)

definePageMeta({
  layout: "lk-layout",
});
</script>
