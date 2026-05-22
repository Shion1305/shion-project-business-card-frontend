// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      title: "Shion Ichikawa Business Card LP",
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/normalize.css",
        },
      ],
    },
  },

  runtimeConfig: {
    gcp: {
      certPath: process.env.GCP_CERT_PATH,
    },
    line: {
      channelId: "",
      channelSecret: "",
      callbackUrl: "",
      adminUserIds: "",
    },
    sessionSecret: "",
  },

  modules: ["@nuxtjs/google-fonts"],

  googleFonts: {
    families: {
      "Noto+Sans+JP": true,
      "BIZ+UDGothic": true,
      "Klee+One": true,
    },
  },

  compatibilityDate: "2025-03-19",
});