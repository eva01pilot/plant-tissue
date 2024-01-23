<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Название компонента</FormLabel>
        <FormControl>
        <Input type="text" placeholder="Хлорид кальция" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="formula">
      <FormItem>
        <FormLabel>Формула компонента</FormLabel>
        <FormControl>
          <Input type="text" placeholder="CaCl2" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <FormLabel>Тип компонента</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
              <SelectItem v-for="item in elementTypesArray" :value="item.name">{{item.title}}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    </FormField>
    <Button type="submit">Создать</Button>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import {elementTypes} from "~/store/elements"
const store = elementsStore();

const elementTypesArray = [{
  name: 'MICROELEMENT',
  title: 'Микроэлемент'
}, {
  name: 'MACROELEMENT',
  title: 'Макроэлемент'
}, {
  name: 'VITAMIN',
  title: 'Витамин'
}]

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    formula: z.string(),
    type: z.enum(["MICROELEMENT", "MACROELEMENT", "VITAMIN"]),
  }),
);
const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit((values) => {
  const valuesWithTypeName = {...values, typeName: elementTypes[values.type]}
  store.addElement(valuesWithTypeName);
});
</script>
