import { CodeBlock, Document, Placeholder, Text } from '@packages/popup/lib/tiptap'
import { Editor, EditorOptions } from '@tiptap/vue-3'
import { Ref, onMounted, onUnmounted, ref, watch } from 'vue'

export const useTiptapService = (content: Ref<string>, options?: Partial<EditorOptions>) => {
  const editor: Ref<Editor | null> = ref(null)

  onMounted(() => {
    editor.value = new Editor({
      content: content.value,
      extensions: [
        Document,
        Text,
        CodeBlock,
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === 'codeBlock') {
              return 'pac'
            }
            return 'url'
          },
          emptyNodeClass: 'tiptapNode--empty',
        }),
      ],
      ...options,
      onUpdate: (props) => {
        content.value = props.editor.getHTML()
        options?.onUpdate?.(props)
      },
    })
  })

  onUnmounted(() => {
    editor.value?.destroy()
    editor.value = null
  })

  watch(content, () => {
    if (editor.value?.getHTML().trim() !== content.value.trim()) {
      editor.value?.commands.setContent(content.value.trim())
    }
  })

  return {
    editor,
  }
}
