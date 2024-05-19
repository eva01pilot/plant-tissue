<template>
  <form @submit.prevent class="flex flex-col gap-6 w-full">
    <FormTextInput
      type="text"
      id="name"
      label="Название питательной среды"
      v-model="formValues.name"
    />
    <FormTextArea
      type="text"
      id="description"
      label="Описание питательной среды"
      v-model="formValues.description"
    />
    <FormFileInput
      label="Обложка питательной среды"
      id="thumbnail"
      v-model="formValues.thumbnail"
    />
    <div
      v-for="(component, id) in formValues.components"
      class="grid grid-cols-[5fr_1fr_48px] gap-2"
    >
      <FormAutocomplete
        v-model="component.component"
        @search="(e)=>mediumFormStore.searchComponents(e)"
        :items="components"
        label="Компонент"
      />
      <FormTextInput
        type="number"
        v-model="component.mass"
        label="Мг/л"
        :id="`mass[${id}]`"
      />
      <CommonBoxButton type="button" class="self-end" variant="main"
      @click="formValues.components.splice(id,1)">
      -
      </CommonBoxButton>
    </div>
    <CommonBoxButton
      type="button"
      :disabled="!canAddComponent"
      variant="main"
      @click="
      formValues.components.push({ mass: '', component:{id:null, name:''} })
      "
    >
      Добавить компонент
    </CommonBoxButton>

    <CommonBoxButton
      type="submit"
      variant="secondary"
      @click="mediumFormStore.createMedium"
    >
      Создать среду
    </CommonBoxButton>

  </form>
</template>

<script setup lang="ts">
import { useMediumFormStore } from "~/store/mediums";

const canAddComponent = computed(()=>{
  if(!formValues.value.components.length) return true
  return !!formValues.value.components[formValues.value.components.length-1].component.id
})

const mediumFormStore = useMediumFormStore();
const { formValues, components } = storeToRefs(mediumFormStore);
</script>
