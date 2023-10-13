import { type Color, type PacType } from '@packages/popup/constants'

export interface DefaultPac {
  name: null
}

export interface NewPac {
  name: string
  type: PacType
  value: string
  color?: Color | null | undefined
  selectedAt?: number | null | undefined
}

export type Pac<T extends string | undefined = string | undefined> = T extends undefined
  ? {
      type?: never
      name: null
      color?: never
      url?: never
      selectedAt?: never
    }
  :
      | NewPac
      | {
          name: T
          type?: PacType | null | undefined
          value?: string | null | undefined
          color?: never
          selectedAt?: never
          url: string
        }
