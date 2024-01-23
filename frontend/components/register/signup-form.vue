<template>
  <form @submit.prevent="onSubmit">
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
          Это имя пользователя будет использоваться для авторизации
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Пароль</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Пароль" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Этот пароль будет использоваться для регистрации
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="passwordRepeat">
      <FormItem>
        <FormLabel>Повторите пароль</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Пароль" v-bind="componentField" />
        </FormControl>
        <FormDescription> Введите пароль повторно </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="space-y-2">
      <Label
        for="avatar"
        class="block text-sm tracking-tight font-medium text-foreground text-left"
        >Аватар</Label
      >
      <Input
        id="avatar"
        type="file"
        @change="onFileUpload"
        placeholder="Имя пользователя"
      />
      <p v-if="avatarError" class="text-[0.8rem] font-medium text-destructive">Поле Аватар обязательно</p>
    </div>
    <Button type="submit"> Зарегистрироваться </Button>
  </form>
</template>

<script setup lang="ts">
import { ErrorMessage, useForm } from "vee-validate";
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
import { Button } from "../ui/button";
import { useBase64 } from "@vueuse/core";
import { Label } from "radix-vue";
import {userStore} from "../../store/user"
const store = userStore()


const loginSchema = toTypedSchema(
  z
    .object({
      username: z.string().min(4).max(20),
      password: z.string(),
      passwordRepeat: z.string(),
    })
    .partial()
    .superRefine((data, customErr) => {
      console.log(data);
      if (
        data.password &&
        data.passwordRepeat &&
        data.password !== data.passwordRepeat
      ) {
        customErr.addIssue({
          path: ["password"],
          code: z.ZodIssueCode.custom,
          message: "Пароли не совпадают",
        });
        customErr.addIssue({
          path: ["passwordRepeat"],
          code: z.ZodIssueCode.custom,
          message: "Пароли не совпадают",
        });
      }
    }),
);

const loginForm = useForm({ validationSchema: loginSchema });

const file = ref<string>();
const avatarError = computed(()=>{
  return !file.value
})

const onFileUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files?.length) return;
  file.value = await useBase64(files[0]).execute();
};

const onSubmit = loginForm.handleSubmit(async(values) => {
    if(!values.username) {
      loginForm.setErrors({username: 'Имя пользователя обязательно'})
      return
    }
    if(!file.value) return
    store.signUp({username: values.username as string, password: values.password as string, avatar: file.value})
  })
</script>
