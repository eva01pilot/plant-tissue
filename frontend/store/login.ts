import { toast } from "vue-sonner";

export const useLoginStore = defineStore("login", () => {
  const login = ref("");
  const password = ref("");
  const { $trpc, $ToastComponent, $api, $notify } = useNuxtApp();
  const errors = reactive(new Map<"login" | "password", string>());
  const submit = async () => {
    try {
      const res = await $api.auth.login({password:password.value, username: login.value})
      $notify("Вход прошёл успешно");
      navigateTo("/")
    } catch (e) {
      const component = h($ToastComponent as any, { message: "Неправильный логин" });
      toast.custom(component);
      errors.set("login", "Неправильный логин или пароль");
      errors.set("password", "Неправильный логин или пароль");
    }
  };
  return { login, password, errors, submit };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot))
}
