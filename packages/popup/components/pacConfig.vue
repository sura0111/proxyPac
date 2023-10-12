<template>
  <VForm v-model="isFormValid" class="pacConfig" @submit.prevent="onSubmit({ name, value: pacValue, color })">
    <div class="pacConfig__field">
      <div class="pacConfig__label">Name</div>
      <VTextField
        v-model="name"
        class="pacConfig__input"
        variant="plain"
        density="compact"
        placeholder="..."
        :rules="nameRules"
      ></VTextField>
    </div>
    <div class="pacConfig__field d-flex">
      <div>
        <div class="pacConfig__label">Type</div>
        <VBtnToggle v-model="pacType" color="primary" mandatory variant="outlined" density="compact">
          <VBtn>URL</VBtn>
          <VBtn>Text</VBtn>
        </VBtnToggle>
      </div>
      <VSpacer></VSpacer>
      <div>
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
      <VBtn class="mr-1" color="primary" :disabled="!isValid" type="submit">Save</VBtn>
      <VBtn elevation="0" variant="text" size="small" @click="onCancel">Cancel</VBtn>
      <VSpacer></VSpacer>
      <VBtn v-if="isEditMode" icon color="secondary" size="32" elevation="0" @click="onSubmit({ name })">
        <VIcon icon="mdi-delete" size="small"></VIcon
      ></VBtn>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { usePacConfigService, useTiptapService } from '@packages/popup/services'
import { EditorContent } from '@tiptap/vue-3'
import { computed, ref } from 'vue'
import { colors } from '@packages/popup/constants'
import { type Pac } from '@packages/popup/types'

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
  isValid,
  isRetrievingPacView,
  isFailedFetchingPacView,
  color,
  pacValue,
  hasPac,
  updatePacRawValue,
  updatePacViewValue,
} = await usePacConfigService()
const isFormValid = ref(true)

name.value = props.pac?.name ?? ''
color.value = props.pac?.color ?? null
const isEditMode = name.value.trim() !== ''

if (props.pac) {
  if ('value' in props.pac) {
    updatePacRawValue(props.pac.value)
  } else if ('url' in props.pac && props.pac.url) {
    updatePacRawValue(props.pac.url)
  }
}

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

const nameRequiredRule = (value: string) => {
  return !!value || 'name is required'
}
const nameUniqueRule = (value: string) => {
  return !hasPac(value) || 'name must be unique'
}
const nameRules = isEditMode ? [nameRequiredRule] : [nameRequiredRule, nameUniqueRule]

const onSubmit = (pac: Pac | { name: string }) => {
  if (!isValid.value) {
    return
  }

  emit('update:pac', pac)
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.pacConfig {
  &__editor {
    :deep(> .tiptap:focus) {
      outline: none;
    }

    :deep(.hljs) {
      min-height: 45px;
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
    font-weight: 700;
    padding-bottom: 4px;
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
    display: flex;
    align-items: center;
    margin-top: 24px;
  }
}
</style>
