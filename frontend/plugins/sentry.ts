import * as Sentry from "@sentry/vue";
export default defineNuxtPlugin((nuxtApp) => {
 // Sentry.init({
 //   dsn: "http://059e1b15672ae7d8b3e67be0a48fd2b3@80.87.106.181:9000/2",
 //   app: nuxtApp.vueApp,
 //   integrations: [
 //     new Sentry.BrowserTracing({
 //       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
 //       tracePropagationTargets: [
 //         "localhost",
 //         /^https:\/\/yourserver\.io\/api/,
 //       ],
 //     }),
 //     new Sentry.Replay({
 //       maskAllText: false,
 //       blockAllMedia: false,
 //     }),
 //   ],
 //   // Performance Monitoring
 //   tracesSampleRate: 1.0, //  Capture 100% of the transactions
 //   // Session Replay
 //   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
 //   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
 // });
});