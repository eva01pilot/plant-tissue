import { defineNuxtRouteMiddleware, useNuxtApp } from "nuxt/app";
import { userStore } from "~/store/user";
export default defineNuxtRouteMiddleware(async(to, from) => {
  const {$trpc} = useNuxtApp()

  try {
    await userStore().getMe(navigateTo('/login'))
  } catch(e) {
    console.log('getMew')
    return navigateTo('/login')
  }

});
