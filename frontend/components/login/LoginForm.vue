<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4 w-96">
    <FormInputField :error="loginForm.errors.value.username">
      <IconField>
        <InputIcon>
          <i class="pi pi-user" />
        </InputIcon>
        <InputText class="w-full" v-model="username" type="text" placeholder="user" autofocus />
      </IconField>
    </FormInputField>
    <FormInputField :error="loginForm.errors.value.password">
      <IconField>
        <InputIcon>
          <i class="pi pi-key" />
        </InputIcon>
        <InputText class="w-full" v-model="password" type="text" placeholder="********" autofocus />
      </IconField>
    </FormInputField>
    <Button label="Submit" type="submit"/>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import z from "~/lib/zod";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import type { TRPCError } from "@trpc/server";

const {$trpc} = useNuxtApp()

const loginSchema = toTypedSchema(
  z.object({
    username: z.string().min(4).max(20),
    password: z.string(),
  }),
);

const loginForm = useForm({ validationSchema: loginSchema });
const [username] = loginForm.defineField('username')
const [password] = loginForm.defineField('password')


const onSubmit = loginForm.handleSubmit(async(values) => {
  try {
    await $trpc.auth.login.mutate(values)
    navigateTo('/')
  } catch(e) {
    const error = e as TRPCError
    loginForm.setErrors({username: error.message})
  }
});
</script>
