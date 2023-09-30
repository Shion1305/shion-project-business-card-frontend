// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
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
      projectID: process.env.GCP_PROJECT_ID,
    },
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Noto+Sans+JP": true,
      "BIZ+UDGothic": true,
      "Klee+One": true,
    },
  },
});
