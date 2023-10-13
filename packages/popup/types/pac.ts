import { type Color, type PacType } from '@packages/popup/constants'

export type Pac<T extends string | undefined = string | undefined> = T extends undefined
  ? {
      type?: never
      name: null
      color?: never
      url?: never
      selectedAt?: never
    }
  : {
      name: T
      type?: PacType | null
      value?: string
    } & (
      | {
          type: PacType
          value: string
          color?: Color | null
          selectedAt?: number | null
          url?: never
        }
      | {
          type: never
          value?: string | null
          color?: never
          selectedAt?: never
          url: string
        }
    )
