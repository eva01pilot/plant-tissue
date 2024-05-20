<template>
  <div class="flex justify-center items-center w-full h-full">
    <form @submit.prevent="loginStore.submit" class="flex flex-col gap-10">
      <Card class="flex px-12 pt-12 justify-center items-center flex-col gap-6">
        <Input
          v-model="login"
          type="text"
          label="Логин"
          id="login"
          :error="errors.get('login')"
          @update:model-value="errors.set('login', '')"
        />
        <Input
          v-model="password"
          type="password"
          label="Пароль"
          id="password"
          :error="errors.get('password')"
          @update:model-value="errors.set('password', '')"
        />

        <div class="flex flex-col items-end w-full">
          <ButtonVue as="button" class="self-end">
            <User class="w-4 h-4" />Войти
          </ButtonVue>
        </div>
        <UICardFooter class="w-full px-12 py-6">
          <NuxtLink to="/signup" class="">
            <ButtonVue variant="link"> Зарегистрироваться </ButtonVue>
          </NuxtLink>
        </UICardFooter>
      </Card>
    </form>
  </div>
</template>

<script setup lang="ts">
import { User } from "lucide-vue-next";
import ButtonVue from "~/components/ui/button/Button.vue";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { useLoginStore } from "~/store/login";
definePageMeta({
  layout: "auth-layout",
});
const loginStore = useLoginStore();

const { errors, password, login } = storeToRefs(loginStore);
</script>
