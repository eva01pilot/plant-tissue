import { toast } from "vue-sonner";
import login from "~/pages/login.vue";

export const useSignupStore = defineStore("signup", () => {
  const login = ref("");
  const password = ref("");
  const passwordRepeat = ref("");
  const { $trpc, $notify, $api } = useNuxtApp();
  const errors = reactive(
    new Map<"login" | "password" | "passwordRepeat", string>(new Map()),
  );
  const step = ref<"credentials" | "avatar">("credentials");

  watch(passwordRepeat, () => {
    if (passwordRepeat.value !== password.value) {
      errors.set("passwordRepeat", "Пароли не совпадают долбоеб");
    } else {
      errors.set("passwordRepeat", "");
    }
  });

  const nextStep = () => {
    if (
      login.value &&
      password.value.length &&
      password.value === passwordRepeat.value
    ) {
      step.value = "avatar";
    } else {
      $notify("Сначала введите данные для входа");
    }
  };

  const submit = async () => {
    try {
      const res = await $api.auth.signup({
        username: login.value,
        password: password.value,
        password_repeat: passwordRepeat.value,
      });
    } catch (e) {
      $notify("Неправильный логин");
      errors.set("login", "Неправильный логин или пароль");
      errors.set("password", "Неправильный логин или пароль");
    }
  };
  return { login, password, errors, submit, passwordRepeat, step, nextStep };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSignupStore, import.meta.hot));
}
