<template>
  <form @submit.prevent="onSubmit" >
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Имя пользователя</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Имя пользователя"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          Имя пользователя, которое вы указали при регистрации
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Пароль</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Пароль" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Пароль, который вы указали при регистрации
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <UiButton type="submit"> Войти </UiButton>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import z from "@/lib/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {userStore} from "../../store/user"
const store = userStore()

const loginSchema = toTypedSchema(
  z.object({
    username: z.string().min(4).max(20),
    password: z.string(),
  }),
);

const loginForm = useForm({ validationSchema: loginSchema });


const onSubmit = loginForm.handleSubmit((values) =>
  store.login(values)
);
</script>
