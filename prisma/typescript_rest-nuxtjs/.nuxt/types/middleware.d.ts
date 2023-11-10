import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "C:/dev/projects/prisma/typescript_rest-nuxtjs/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}