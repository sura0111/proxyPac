<template>
  <VForm
    ref="form"
    v-model="isFormValid"
    class="pacConfig"
    @submit.prevent="onSubmit({ name, value: pacValue, color, type: pacType })"
  >
    <div class="pacConfig__field">
      <div class="pacConfig__label">Name</div>
      <VTextField
        v-model="name"
        class="pacConfig__input"
        variant="plain"
        density="compact"
        placeholder="pacSwitcher"
        :rules="nameRules"
      ></VTextField>
    </div>
    <div class="pacConfig__field pacConfig__field--flex">
      <div class="pacConfig__fieldItem">
        <div class="pacConfig__label">Type</div>
        <VBtnToggle v-model="pacType" color="primary" mandatory variant="outlined" density="compact">
          <VBtn>URL</VBtn>
          <VBtn>Text</VBtn>
        </VBtnToggle>
      </div>
      <div class="pacConfig__fieldItem">
        <div class="pacConfig__label">Tag</div>
        <VBtnToggle v-model="colorIndex" density="compact" class="pacConfig__colors" color="text-tertiary">
          <VBtn
            v-for="(colorOption, id) in colorOptions"
            :key="id"
            class="pacConfig__color"
            icon
            @click="color = colorOption"
          >
            <VAvatar :class="`color__${colorOption ?? 'none'}`" size="20"></VAvatar>
          </VBtn>
        </VBtnToggle>
      </div>
    </div>
    <div class="pacConfig__field">
      <div class="pacConfig__label">{{ pacType === 0 ? 'URL' : 'Config' }}</div>
      <VTextField
        v-if="pacType === 0"
        :model-value="pacValue"
        :rules="urlRules"
        class="pacConfig__input"
        variant="plain"
        density="compact"
        placeholder="https://..."
        @update:model-value="updatePacRawValue"
      ></VTextField>
      <EditorContent v-else-if="editor" class="pacConfig__editor" :editor="editor"></EditorContent>
    </div>
    <div v-if="pacType === 0" class="pacConfig__field">
      <div class="pacConfig__label">Loaded Content (readonly)</div>
      <VProgressLinear v-if="isRetrievingPacView" class="my-2" indeterminate></VProgressLinear>
      <div v-else-if="isFailedFetchingPacView">Failed to load</div>
      <EditorContent
        v-else-if="viewer"
        class="pacConfig__editor pacConfig__editor--readonly"
        :editor="viewer"
      ></EditorContent>
    </div>
    <div class="pacConfig__actions">
      <VBtn
        class="mr-1 pacConfig__button--important"
        color="primary"
        variant="flat"
        :disabled="!isValid || !isFormValid"
        type="submit"
      >
        Save
      </VBtn>
      <VBtn elevation="0" variant="text" size="small" @click="onCancel">Cancel</VBtn>
      <VSpacer></VSpacer>
      <VBtn v-if="isEditMode" variant="text" color="secondary" size="32" elevation="0" @click="onSubmit({ name })">
        <VIcon icon="mdi-delete" size="small"></VIcon
      ></VBtn>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { usePacConfigService, useTiptapService } from '@packages/popup/services'
import { EditorContent } from '@tiptap/vue-3'
import { computed, ref, watch } from 'vue'
import { PacType, colors } from '@packages/popup/constants'
import { type Pac } from '@packages/popup/types'
import { VForm } from 'vuetify/lib/components/index.mjs'
import { isUrl } from '@packages/popup/lib'

const props = defineProps<{ pac?: Pac }>()
const emit = defineEmits<{
  (event: 'update:pac', value: Pac | { name: string }): void
  (event: 'cancel'): void
}>()

const {
  pacType,
  name,
  pacRawHtmlValue,
  pacViewHtmlValue,
  isRetrievingPacView,
  isFailedFetchingPacView,
  color,
  pacValue,
  hasPac,
  updatePacRawValue,
  updatePacViewValue,
} = await usePacConfigService()
const isFormValid = ref(true)

/** back compatibility */
const getPacValue = () => {
  if (!props.pac) {
    return undefined
  }
  if (props.pac.type) {
    return props.pac.value
  }
  return 'value' in props.pac ? props.pac.value : props.pac.url
}

const getPacType = () => {
  if (props.pac?.type) {
    return props.pac.type
  }

  const pacValue = getPacValue()

  if (pacValue) {
    return isUrl(pacValue) ? PacType.url : PacType.text
  }

  return PacType.url
}

const form = ref<VForm | null>(null)
name.value = props.pac?.name ?? ''
color.value = props.pac?.color ?? null
const isEditMode = name.value.trim() !== ''
pacType.value = getPacType()
updatePacRawValue(getPacValue())

const editorContent = computed({
  get: () => {
    return pacRawHtmlValue.value
  },
  set: () => {
    updatePacRawValue(editor.value?.getText())
  },
})

const viewerContent = computed({
  get: () => {
    return pacViewHtmlValue.value
  },
  set: () => {
    updatePacViewValue(viewer.value?.getText())
  },
})

const colorOptions = [null, ...colors]

const colorIndex = computed({
  get: () => {
    return colorOptions.indexOf(color.value)
  },
  set: (index) => {
    color.value = colorOptions[index]
  },
})

const { editor } = useTiptapService(editorContent)
const { editor: viewer } = useTiptapService(viewerContent, { editable: false })

const createRequiredRule = (target: string) => (value: string) => {
  return !!value || `${target} is required`
}

const nameRequiredRule = createRequiredRule('name')

const nameUniqueRule = (value: string) => {
  return !hasPac(value) || 'name must be unique'
}

const urlPatternRule = (value: string) => {
  if (pacType.value === PacType.text) {
    return true
  }
  return isUrl(value) || 'url is incorrect'
}

const nameRules = isEditMode ? [nameRequiredRule] : [nameRequiredRule, nameUniqueRule]
const urlRules = [createRequiredRule('url'), urlPatternRule]

const isValid = computed(() => {
  if (isRetrievingPacView.value) {
    return false
  }
  return name.value && pacValue.value && (isEditMode || !hasPac(name.value.trim()))
})

const onSubmit = (pac: Pac | { name: string }) => {
  if (!isValid.value) {
    return
  }

  emit('update:pac', pac)
}

const onCancel = () => {
  emit('cancel')
}

watch(pacType, () => {
  form.value?.resetValidation()
})
</script>

<style lang="scss" scoped>
.pacConfig {
  margin-bottom: 40px;

  &__editor {
    :deep(> .tiptap:focus) {
      outline: none;
    }

    :deep(.hljs) {
      min-height: 45px;
      font-size: 0.85rem;
      border: 1px solid rgb(var(--v-theme-border));
      border-radius: 8px;
      background-color: #303135;
      padding: 8px;
      overflow: auto;
      white-space: pre;
    }

    &--readonly {
      :deep(.hljs) {
        border: none;
      }
    }
  }

  &__label {
    font-weight: 500;
    font-size: 0.85rem;
    padding-bottom: 4px;
  }

  &__field {
    &--flex {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    &Item + &Item {
      padding-left: 24px;
    }
  }

  &__field + &__field {
    margin-top: 12px;
  }

  &__input {
    :deep(.v-field) {
      border: 1px solid rgb(var(--v-theme-border));
      border-radius: 8px;
      background-color: rgb(var(--v-theme-tertiary));
      padding: 0 8px;
    }
    :deep(input) {
      padding: 8px 0;
    }
  }

  &__colors {
    height: 32px;
    .pacConfig__color {
      border-radius: 100%;
      padding: 0;
      width: 32px;
    }
  }

  &__actions {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 4px 16px;
    width: 100%;
    background-color: rgb(var(--v-theme-tertiary));
  }

  &__button {
    &--important {
      text-transform: uppercase;
    }
  }
}
</style>
