import 'highlight.js/styles/atom-one-dark.css'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import js from 'highlight.js/lib/languages/javascript'
import { createLowlight } from 'lowlight'

const lowlight = createLowlight()
lowlight.register('js', js)
lowlight.register('javascript', js)

export const CodeBlock = CodeBlockLowlight.configure({
  lowlight,
  HTMLAttributes: {
    class: 'hljs',
  },
})
