<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Название среды</FormLabel>
        <FormControl>
          <CommonInputText type="text" placeholder="Среда Мурасиге-Скуга" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Описание среды</FormLabel>
        <FormControl>
          <CommonTextArea v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FieldArray name="components" v-slot="{ fields, push, remove }">
      <div v-for="(field, idx) in fields">
        <div class="flex flex-row gap-4 items-end">
          <FormField v-slot="{ componentField }" :name="`components[${idx}].element`">
            <FormItem>
              <FormLabel>Компоненты среды</FormLabel>
              <FormControl>
                <CommonAutocomplete :items="elements" @change="(e:
                  any) => { form.setFieldValue(`components[${idx}].element` as any, e.value) }" v-model:query="searchTerm" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" :name="`components[${idx}].mg_per_liter`">
            <FormItem>
              <FormLabel>Количество (мг/л)</FormLabel>
              <FormControl>
                <CommonInputText type="number" placeholder="100" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" :name="`components[${idx}].concentration`">
            <FormItem>
              <FormLabel>μ</FormLabel>
              <FormControl>
                <CommonInputText type="number" placeholder="0.434" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <div tabindex="0">
            <UiButton variant="destructive" class="space-y-2" @click="remove(idx)" type="button">
              -
            </UiButton>
          </div>
        </div>
      </div>
      <div>
        <UiButton type="button" class="space-y-2" @click="push({ element_id: null, mg_per_liter: 0, concentration: 0 })">
          Добавить поле компонента
        </UiButton>
      </div>
    </FieldArray>
    <Button type="submit">Создать</Button>
  </Form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, FieldArray, type SubmissionContext } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import Button from "../ui/button/Button.vue";
import { elementsStore, type ElementTable } from "~/store/elements";
import { mediumsStore } from "~/store/mediums";

import { schema } from "@/store/mediums"
import type { z } from "zod";
const elemStore = elementsStore();
const medStore = mediumsStore();

await elemStore.getAllElements();
const { searchTerm } = storeToRefs(elemStore)
const selectedItem = ref<ElementTable>()

const elements = computed(() => {
  return elemStore.getElements;
});


const initialData: z.infer<typeof schema> = {
  name: "",
  description: "",
  components: [
    {
      mg_per_liter: 0,
      concentration: 0,
      element: {
        id: 0,
        name: '',
        type: 'MICROELEMENT',
        formula: '',
        typeName: '',
        meta_data: {}
      },
    },
  ],
};


const formSchema = toTypedSchema(schema);
const form = useForm({
  validationSchema: formSchema,
  initialValues: initialData
});


const onSubmit = form.handleSubmit((values) => {
  form.validate()
  console.log('submit')
  medStore.addMedium(values);
})
</script>
