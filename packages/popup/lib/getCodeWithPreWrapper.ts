export const getCodeWithPreWrapper = (content = '', language = 'javascript') => {
  return `<pre><code class="language-${language}">${content}</code></pre>`
}
