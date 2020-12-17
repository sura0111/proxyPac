import store from '@/popup/store'

declare module 'vue/types/vue' {
  interface VueConstructor {
    $s: typeof store
  }
  interface Vue {
    $s: typeof store
  }
}
