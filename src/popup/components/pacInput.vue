<template>
  <div class="pacInput">
    <text-editor
      v-show="isChrome"
      id="PacInput"
      v-model.trim.lazy="model"
      :input-class="'pacInput__editor'"
      placeholder="http://localhost/proxy/example.pac"
      label="Pac Url/Text"
      @change="change"
    ></text-editor>

    <v-text-field
      v-show="!isChrome"
      v-model.trim.lazy="model"
      label="Pac Url"
      aria-label="pac"
      placeholder="http://localhost/proxy/example.pac"
      dense
      outlined
      flat
      filled
      @change="change"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import detectChrome from '@/utils/isChrome'
import { computed, defineComponent } from '@vue/composition-api'
import textEditor from './textEditor.vue'

export default defineComponent({
  components: {
    textEditor,
  },
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  emits: {
    'update:value': (_: string) => undefined,
    change: () => undefined,
  },
  setup(props, { emit }) {
    const isChrome = detectChrome()

    const model = computed<string>({
      get() {
        return props.value
      },
      set(value) {
        emit('update:value', value)
      },
    })

    const change = () => emit('change')

    return {
      isChrome,
      model,
      change,
    }
  },
})
</script>
<style lang="scss" scoped>
::v-deep {
  .pacInput {
    &__editor {
      font-family: monospace;
      overflow: scroll;
      background-color: #ebebeb;
    }
  }
}
</style>
