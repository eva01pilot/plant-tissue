<template>
  <form action="" class="flex flex-col gap-3 items-center">
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
      class="grid grid-cols-[1fr_64px_64px] gap-1 w-full"
      v-for="(comp, id) in formValues.components"
    >
      <FormCombobox
        v-model="formValues.components[id].component"
        valueKey="component_formula"
        :items="components"
      />
      <UIInput
        type="number"
        v-model="formValues.components[id].mass"
        placeholder="Мг/л"
      />
      <UIButton type="button" variant="destructive" @click="delete formValues.components[id]"
        >-</UIButton
      >
    </div>
    <UIButton
      variant="outline"
      :disabled="!formValues.components.findLast(()=>true)?.component.component_formula ||
      !formValues.components.findLast(()=>true)?.mass"
      class="w-full"
      @click="
        formValues.components.push({
          mass: '0',
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
