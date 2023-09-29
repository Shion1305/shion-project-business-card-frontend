// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link:[
        {
          rel: "stylesheet",
          href: "https://unpkg.com/normalize.css"
        }
      ]
    }
  }
})
