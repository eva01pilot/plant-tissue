<template>
  <form @submit.prevent="mediumFormStore.createMedium" class="flex flex-col gap-3 items-center">
    <UIInput
      v-model="formValues.name"
      placeholder="Название питательной среды"
    />
    <UITextarea
      class="max-h-96"
      v-model="formValues.description"
      placeholder="Описание питательной среды"
    />
    <div
      class="grid grid-cols-[1fr_128px_64px] gap-1 w-full"
      v-for="(comp, id) in formValues.components"
    >
      <FormCombobox
        v-model="formValues.components[id].component"
        valueKey="component_formula"
        :items="components"
      />
      <UIInput
        type="number"
        v-model="formValues.components[id].mg_per_liter"
        placeholder="Мг/л"
        step="0.01"
      />
      <UIButton type="button" variant="destructive"
      @click="formValues.components.splice(id,1)"
        >-</UIButton
      >
    </div>
    <UIButton
      variant="outline"
      :disabled="(!formValues.components.findLast(()=>true)?.component.component_formula ||
      !formValues.components.findLast(()=>true)?.mg_per_liter) &&
      formValues.components.length"
      class="w-full"
      @click="
        formValues.components.push({
          mg_per_liter: '0',
          component: { id: null, component_formula: '',component_molar_mass:
          0,type_id:0 },
        })
      "
      >Добавить компонент</UIButton
    >
    <MiscCropper v-model="formValues.thumbnail"/>
    <UIButton type="submit" class="self-end"> Создать </UIButton>
  </form>
</template>

<script setup lang="ts">
import { useMediumFormStore } from "~/store/mediums";

const mediumFormStore = useMediumFormStore();
const { components, formValues } = storeToRefs(mediumFormStore);
onMounted(() => {
  mediumFormStore.searchComponents("");
});
</script>
