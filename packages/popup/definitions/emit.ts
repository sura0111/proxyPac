export interface EmitModelChange {
  (event: 'update:modelValue', value: string): void
  (event: 'change'): void
}
