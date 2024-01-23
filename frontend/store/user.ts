import { defineStore } from "pinia";
import { useNuxtApp } from "nuxt/app";
import type { User } from "../../backend/types/user";
import { toast, useToast } from "@/components/ui/toast/use-toast";
import type { TRPCError } from "@trpc/server";
import { ToastAction } from "radix-vue";
export const userStore = defineStore("user", () => {
  const user = ref<User>(null!);
  const { $trpc } = useNuxtApp();
  const { toast } = useToast();
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
        toast({
          title: "Произошла ошибка",
          description: e.message,
          variant: "destructive",
        });
      });
  }

  function updateMe(avatar: string) {
    $trpc.user.updateUser
      .mutate({ avatar })
      .then((res) => (user.value = res))
      .catch((e: TRPCError) => {
        toast({
          title: "Произошла ошибка",
          description: e.message,
          variant: "destructive",
        });
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
        toast({
          title: "Ошибка авторизации",
          description: e.message,
          variant: "destructive",
        });
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
        toast({
          title: "Ошибка регистрации",
          description: e.message,
          variant: "destructive",
        });
      });
  }

  return { user, signUp, login, updateMe, getMe, logOut };
});
