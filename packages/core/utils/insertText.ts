export const insertText = (text: string) => {
  const selection = window.getSelection()
  const rangeCount = selection?.rangeCount

  if (selection && rangeCount) {
    const range = selection.getRangeAt(0)
    range.collapse(true)
    const span = document.createTextNode(text)
    range.insertNode(span)

    // Move the caret immediately after the inserted span
    range.setStartAfter(span)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
