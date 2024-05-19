<template>
  <div class="flex justify-center items-center w-full h-full">
    <CommonPanel class="bg-rose-50 ">
      <form @submit.prevent="loginStore.submit" class="flex flex-col gap-10">
      <div class="flex px-12 pt-12 justify-center items-center flex-col gap-6">
        <FormTextInput v-model="login" type="text" label="Логин" id="login"
        :error="errors.get('login')" @update:model-value="errors.set('login','')">
          <template #icon>
            <IconsUser />
          </template>
        </FormTextInput>
        <FormTextInput v-model="password" type="password" label="Пароль"
        id="password" :error="errors.get('password')"
        @update:model-value="errors.set('password','')">
          <template #icon>
            <IconsKey />
          </template>
        </FormTextInput>
      </div>
      <div class="px-12 flex flex-col items-end">
        <CommonBoxButton type="submit" variant="main" class="w-1/2"> Войти </CommonBoxButton>
      </div>
      <div class="w-full bg-rose-100 px-12 py-6">
        <CommonLink to="/signup" class="">
          Зарегистрироваться
        </CommonLink>
      </div>
      </form>
    </CommonPanel>
  </div>
</template>

<script setup lang="ts">
import { IconsUser, IconsKey } from "#components";
import { useLoginStore } from "~/store/login";
definePageMeta({
  layout: "auth-layout",
});
const loginStore = useLoginStore()

const {errors,password,login} = storeToRefs(loginStore)
</script>
