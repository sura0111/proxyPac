import { CodeBlock, Document, Placeholder, Text } from '@packages/popup/lib/tiptap'
import { Editor, type EditorOptions } from '@tiptap/vue-3'
import { type Ref, onMounted, onUnmounted, ref, watch } from 'vue'

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
        content.value = editor.value?.getHTML() ?? ''
        console.log(content.value)
        options?.onUpdate?.(props)
      },
    })
  })

  onUnmounted(() => {
    editor.value?.destroy()
    editor.value = null
  })

  watch(content, () => {
    // TODO: improve - remove replaceAll
    if (editor.value?.getHTML().trim().replaceAll(' class="hljs"', '') !== content.value.trim()) {
      editor.value?.commands.setContent(content.value.trim())
    }
  })

  return {
    editor,
  }
}
