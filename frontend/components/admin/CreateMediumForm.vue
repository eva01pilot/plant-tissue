<template>
  <form @submit="handleSubmit" v-focustrap class="flex flex-col gap-2 w-full justify-start">
    <FormInputField :error="form.errors.value.name??''">
      <InputText v-model="name" placeholder="Среда Мурасиге-Скуга" />
    </FormInputField>
    <FormInputField>
      <Textarea
        placeholder="Питательная среда, используемая в лабораториях для выращивания растительной культуры клеток или цельных растений"
        class="w-full"
        v-model="description" />
    </FormInputField>
    <FieldArray name="components" v-slot="{ fields, push, remove }">
      <div v-for="(field, idx) in fields">
        <div class="flex flex-row gap-4 items-end">
          <FormAutocomplete class="w-full" v-if="components" :items="elements" v-model="components[idx].element"
            v-model:query="searchTerm" />
          <FormInputField>
            <InputNumber class="w-full" v-if="components" v-model="components[idx].mg_per_liter" />
          </FormInputField>
          <FormInputField>
            <InputNumber class="w-full" v-if="components" v-model="components[idx].concentration" />
          </FormInputField>
          <div tabindex="0">
            <Button severity="danger" class="space-y-2" @click="remove(idx)" type="button">
              -
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Button type="button" class="space-y-2" @click="push({ element_id: null, mg_per_liter: 0, concentration: 0 })">
          Добавить поле компонента
        </Button>
      </div>
    </FieldArray>
    <Button type="submit" class="self-start">Создать</Button>
  </Form>
</template>

<script setup lang="ts">
import type { TRPCError } from '@trpc/server';
import { toTypedSchema } from '@vee-validate/zod';
import InputText from 'primevue/inputtext';
import { FieldArray, useForm } from 'vee-validate';
import { schema } from "@/store/mediums"
import { elementsStore, type ElementTable } from "~/store/elements";
import { mediumsStore } from "~/store/mediums";
import z from '~/lib/zod'
import { storeToRefs } from 'pinia';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
const { $trpc } = useNuxtApp()

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
        typeName: 'Микроэлемент',
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


const [name] = form.defineField('name')
const [description] = form.defineField('description')
const [components] = form.defineField('components')

const handleSubmit = form.handleSubmit((values)=>{
  medStore.addMedium(values)
})


</script>
