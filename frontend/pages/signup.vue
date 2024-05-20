<template>
  <div class="flex justify-center items-center w-full h-full">
    <UICard>
      <form @submit.prevent="signupStore.submit" class="flex flex-col gap-10">
        <div
          class="flex px-12 pt-12 justify-center items-center flex-col gap-6"
        >
          <template v-if="step === 'credentials'">
            <UIInput
              v-model="login"
              type="text"
              placeholder="Логин"
              id="login"
              autocomplete="username"
              :error="errors?.get('login')"
              @update:model-value="errors.set('login', '')"
            >
            </UIInput>
            <UIInput
              v-model="password"
              autocomplete="new-password"
              type="password"
              placeholder="Пароль"
              id="password"
              :error="errors.get('password')"
              @update:model-value="errors.set('password', '')"
            />
            <UIInput
              v-model="passwordRepeat"
              type="password"
              autocomplete="new-password"
              placeholder="Повторите пароль"
              id="passwordRepeat"
              :error="errors.get('passwordRepeat')"
            >
            </UIInput>
          </template>
          <template v-else-if="step === 'avatar'">
            <MiscCropper v-model="avatar"/>
          </template>
        </div>
        <div class="px-12 flex flex-col items-end w-full">
          <UIButton
            @click="signupStore.nextStep"
            as="button"
            v-if="step === 'credentials'"
            type="button"
          >
            Далее
          </UIButton>
          <UIButton
            v-if="step === 'avatar'"
            type="submit"
          >
            Зарегистрироваться
          </UIButton>
        </div>
        <UICardFooter class="w-full px-12 py-6">
          <UIButton variant="link">
            <NuxtLink to="/login" class=""> Войти </NuxtLink>
          </UIButton>
        </UICardFooter>
      </form>
    </UICard>
  </div>
</template>

<script setup lang="ts">
import { UIButton, UICard, UIInput, UICardFooter } from "#components";
import { storeToRefs } from "pinia";
import { useSignupStore } from "~/store/sign_up";
definePageMeta({
  layout: "auth-layout",
});
const signupStore = useSignupStore();

const { errors, password, login, passwordRepeat, step, avatar } =
  storeToRefs(signupStore);
</script>
