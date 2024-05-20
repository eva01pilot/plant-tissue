import { defineStore } from "pinia";
import { useNuxtApp } from "nuxt/app";
import type { User } from "../../backend/types/user";
import type { TRPCError } from "@trpc/server";
export const userStore = defineStore("user", () => {
  const user = ref<User>(null!);
  const { $trpc } = useNuxtApp();
  async function getMe(callback: any) {
    try {
      user.value = await $trpc.user.getMe.query();
    } catch (e) {
      user.value = null;
      callback()
    }
  }

  watch(user,async(newUser, oldUser)=>{
    if(!newUser) {
      return navigateTo('/login')
    }
  })
  function logOut() {
    $trpc.auth.logout
      .mutate()
      .then((res) => (user.value = res))
      .catch((e: TRPCError) => {
      });
  }

  function updateMe(avatar: string) {
    $trpc.user.updateUser
      .mutate({ avatar })
      .then((res) => (user.value = res))
      .catch((e: TRPCError) => {
      });
  }
  function login(input: { username: string; password: string }) {
    $trpc.auth.login
      .mutate(input)
      .then((res) => {
        user.value = res;
        navigateTo({ path: "/" });
      })
      .catch((e: TRPCError) => {
      });
  }
  function signUp(input: {
    username: string;
    password: string;
    avatar: string;
  }) {
    $trpc.auth.signUp
      .mutate(input)
      .then((res) => {
        user.value = res;
        navigateTo({ path: "/" });
      })
      .catch((e: TRPCError) => {
      });
  }

  return { user, signUp, login, updateMe, getMe, logOut };
});
