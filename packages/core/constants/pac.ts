export type Pac<Name extends string | null = string | null> = Name extends string
  ? { name: Name; url: string }
  : { name: Name }
