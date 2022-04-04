<template>
  <div :id="id" class="textEditor">
    <span v-if="label" :id="`${id}-label`" class="textEditor__label text-body-2">{{ label }}</span>
    <component
      class="textEditor__input"
      :class="inputClass"
      :aria-labelledby="label ? `${id}-label` : null"
      :is="tag"
      :contenteditable="!disabled"
      @input="sync"
      v-text="content"
      :data-placeholder="placeholder"
      @paste.prevent="paste"
    ></component>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch, nextTick } from '@vue/composition-api'

export default defineComponent({
  name: 'TextEditorComponent',
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: 'pre',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    inputClass: {
      type: String,
      default: null,
    },
  },
  emits: {
    'update:value': (_: string) => undefined,
    change: () => undefined,
  },
  setup(props, { emit }) {
    const content = ref('')
    const value = ref('')

    const sync = (event: Event) => {
      value.value = (event.currentTarget as HTMLElement).innerText
      emit('update:value', value.value)
      emit('change')
    }

    watch(
      () => props.value,
      (v) => {
        console.log('prop', props.value, 'value', value.value)
        if (v.trim() !== value.value.trim()) {
          console.log('hahaha')
          value.value = v
          content.value = v
        }
      },
    )

    const paste = async (event: ClipboardEvent) => {
      const text = event.clipboardData?.getData('text') ?? ''
      const selection = window.getSelection()
      if (!selection?.rangeCount) return false
      selection.deleteFromDocument()
      selection.getRangeAt(0).insertNode(document.createTextNode(text))
      selection.collapseToEnd()
      await nextTick()
      sync(event)
      event.preventDefault()
    }

    onMounted(() => {
      content.value = props.value
      value.value = props.value
    })

    return {
      sync,
      content,
      paste,
    }
  },
})
</script>
<style lang="scss" scoped>
.textEditor {
  width: 100%;
  display: block;
  text-decoration: none;
  color: #000000;
  margin-bottom: 16px;

  &__input {
    font-size: 0.8rem;
    padding: 8px;
  }
}
.textEditor__input[data-placeholder] {
  &:empty {
    &::before {
      content: attr(data-placeholder);
      color: #aaaaaa;
      font-style: italic;
    }
  }
}
</style>
