<template>
  <form @submit="handleSubmit" class="flex flex-col gap-4">
    <FormInputField :error="form.errors.value.name ?? ''">
      <InputText v-model="name" placeholder="Хлорид кальция" />
    </FormInputField>
    <FormInputField :error="form.errors.value.name ?? ''">
      <InputText v-model="formula" placeholder="CaCl" />
    </FormInputField>
    <FormInputField :error="form.errors.value.name ?? ''">
      <Dropdown
        :options="elementTypesArray"
        option-label="title"
        v-model="type"
        option-value="name"
      />
    </FormInputField>
    <Button type="submit" class="self-start">Создать</Button>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { FieldArray, useForm } from "vee-validate";
import { elementsStore, type ElementTable } from "~/store/elements";
import z from "~/lib/zod";
import Button from "primevue/button";
const { $trpc } = useNuxtApp();

const elemStore = elementsStore();

const elementTypesArray = [
  {
    name: "MICROELEMENT",
    title: "Микроэлемент",
  },
  {
    name: "MACROELEMENT",
    title: "Макроэлемент",
  },
  {
    name: "VITAMIN",
    title: "Витамин",
  },
];
await elemStore.getAllElements();

const schema = z.object({
  name: z.string(),
  formula: z.string(),
  type: z.enum(["MICROELEMENT", "MACROELEMENT", "VITAMIN"]),
});
const formSchema = toTypedSchema(schema);

const initialData: z.infer<typeof schema> = {
  name: "",
  formula: "",
  type: "MICROELEMENT",
};
const form = useForm({
  validationSchema: formSchema,
  initialValues: initialData,
});

const [name] = form.defineField("name");
const [type] = form.defineField("type");
const [formula] = form.defineField("formula");

const handleSubmit = form.handleSubmit((values) => {
  elemStore.addElement(values);
});
</script>
