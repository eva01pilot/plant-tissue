<template>
  <div class="flex justify-center items-center w-full h-full">
    <CommonPanel class="bg-rose-50">
      <form @submit.prevent="signupStore.submit" class="flex flex-col gap-10">
        <div
          class="flex px-12 pt-12 justify-center items-center flex-col gap-6"
        >
          <template v-if="step === 'credentials'">
            <FormTextInput
              v-model="login"
              type="text"
              label="Логин"
              id="login"
              autocomplete="username"
              :error="errors?.get('login')"
              @update:model-value="errors.set('login', '')"
            >
              <template #icon>
                <IconsUser />
              </template>
            </FormTextInput>
            <FormTextInput
              v-model="password"
              autocomplete="new-password"
              type="password"
              label="Пароль"
              id="password"
              :error="errors.get('password')"
              @update:model-value="errors.set('password', '')"
            >
              <template #icon>
                <IconsKey />
              </template>
            </FormTextInput>
            <FormTextInput
              v-model="passwordRepeat"
              type="password"
              autocomplete="new-password"
              label="Повторите
        пароль"
              id="passwordRepeat"
              :error="errors.get('passwordRepeat')"
            >
              <template #icon>
                <IconsKey />
              </template>
            </FormTextInput>
          </template>
          <template v-else-if="step==='avatar'">
            <CommonCropper src="1"/>

          </template>
        </div>
        <div class="px-12 flex flex-col items-end w-full">
          <CommonBoxButton @click="signupStore.nextStep" v-if="step==='credentials'" type="button" variant="main">
            Далее
          </CommonBoxButton>
          <CommonBoxButton v-if="step==='avatar'" type="submit" variant="main">
            Зарегистрироваться
          </CommonBoxButton>
        </div>
        <div class="w-full bg-rose-100 px-12 py-6">
          <CommonLink to="/login" class=""> Войти </CommonLink>
        </div>
      </form>
    </CommonPanel>
  </div>
</template>

<script setup lang="ts">
import { IconsUser, IconsKey, CommonCropper } from "#components";
import { useSignupStore } from "~/store/sign_up";
definePageMeta({
  layout: "auth-layout",
});
const signupStore = useSignupStore();

const { errors, password, login, passwordRepeat, step } =
  storeToRefs(signupStore);
</script>
