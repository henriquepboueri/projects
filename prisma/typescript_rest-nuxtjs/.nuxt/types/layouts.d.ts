import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "C:/dev/projects/prisma/typescript_rest-nuxtjs/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}