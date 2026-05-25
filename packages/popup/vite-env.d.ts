/// <reference types="chrome" />
/// <reference types="vite/client" />

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
