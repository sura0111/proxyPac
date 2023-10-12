import { Color } from '@packages/popup/constants'

export type Pac<T extends string | undefined = string | undefined> = T extends undefined
  ? { name: null; color?: never; url?: never }
  : { name: T; value?: string; color?: Color | null; url?: string | null }
