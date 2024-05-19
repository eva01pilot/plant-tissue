<template>
  <form @submit.prevent="componentFormStore.createComponent" class="flex flex-col gap-6 w-full">
    <div class="w-fit">
    <FormTextInput
      type="text"
      id="name"
      label="Название компонента"
      v-model="formValues.name"
    />
    </div>
    <div class="flex flex-row gap-6 items-end">
    <FormTextInput
      type="text"
      id="description"
      label="Формула компонента"
      v-model="formValues.formula"
    />
    <FormDropdown :items="componentTypes" v-model="formValues.type"/>
    </div>
    <CommonBoxButton type="submit" variant="main" class="w-fit">
      Создать
    </CommonBoxButton>
  </form>
</template>

<script setup lang="ts">
import { useCreateComponentForm } from "~/store/components";
import { useMediumFormStore } from "~/store/mediums";

const componentFormStore = useCreateComponentForm();
const { formValues, componentTypes } = storeToRefs(componentFormStore);
onMounted(()=>componentFormStore.fetchComponentTypes())
</script>
