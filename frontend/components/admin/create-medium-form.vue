<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Название среды</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Среда Мурасиге-Скуга" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Описание среды</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Лучшая питательная среда" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FieldArray name="components" v-slot="{ fields, push, remove }">
      <div v-for="(field, idx) in fields">
        <div class="flex flex-row gap-2 items-end">
          <FormField
            v-slot="{ componentField }"
            :name="`components[${idx}].element_id`"
          >
            <FormItem>
              <FormLabel>Компоненты среды</FormLabel>
              <FormControl>
                <Select placeholder="Хлорид кальция" v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите компонент" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="item in elements"
                        :value="String(item.id as number)"
                        >{{ item.name }}</SelectItem
                      >
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            :name="`components[${idx}].mg_per_liter`"
          >
            <FormItem>
              <FormLabel>мг/л</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            :name="`components[${idx}].concentration`"
          >
            <FormItem>
              <FormLabel>μ</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.434"
                  v-bind="componentField"
                />
              </FormControl>
            </FormItem>
          </FormField>
          <UiButton
            variant="destructive"
            class="space-y-2"
            @click="remove(idx)"
          >
            -
          </UiButton>
        </div>
      </div>
      <div>
        <UiButton
          class="space-y-2"
          @click="push({ element_id: null, mg_per_liter: 0, concentration: 0 })"
        >
          Добавить поле компонента
        </UiButton>
      </div>
    </FieldArray>
    <Button type="submit">Создать</Button>
  </Form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm, FieldArray, type SubmissionContext } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "../ui/button/Button.vue";
import { Input } from "../ui/input";
import { elementsStore } from "~/store/elements";
import { mediumsStore } from "~/store/mediums";
import { elementTypes } from "~/store/elements";
import type SelectVue from "../ui/select/Select.vue";
import {schema} from "@/store/mediums"
const elemStore = elementsStore();
const medStore = mediumsStore();

await elemStore.getAllElements();

const elements = computed(() => {
  return elemStore.getElements;
});

function getSubmitFn<Schema extends z.ZodObject<Record<string, any>>>(
  _: Schema,
  callback: (values: z.infer<Schema>, ctx: SubmissionContext) => void,
) {
  return (values: Record<string, any>, ctx: SubmissionContext): void => {
    console.log('sub')
    callback(values, ctx);
  };
}

const initialData = {
  name: "",
  description: "",
  components: [
    {
      mg_per_liter: 0,
      concentration: 0,
      element_id: 0,
    },
  ],
};


const formSchema = toTypedSchema(schema);
const form = useForm({
  validationSchema: formSchema,
  initialValues: initialData
});
const onSubmit = form.handleSubmit((values)=>{
  medStore.addMedium(values);
  console.log('submit')
}) 
</script>
