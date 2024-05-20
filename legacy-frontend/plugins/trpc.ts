import { createTRPCProxyClient, httpBatchLink, httpLink } from "@trpc/client";
import type { AppRouter } from "../../backend";
import type { TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
declare module "#app" {
  interface NuxtApp {
    $trpc: ReturnType<typeof createTRPCProxyClient<AppRouter>>;
  }
}

export default defineNuxtPlugin(() => {
  const conf = useRuntimeConfig();
  // eslint-disable-next-line no-console
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: conf.public.TRPC_DOMAIN as string,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "include",
          })
          ;
        },
      }),
    ],
  });
  return {
    provide: {
      trpc: trpc,
    },
  };
});
