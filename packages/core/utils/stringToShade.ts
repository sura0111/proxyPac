import stringToColor from 'string-to-color'

const stringToShade = (text?: string | null | undefined) => {
  const color = stringToColor(text)
  const red = Number(`0x${color.slice(1, 2)}`)
  const green = Number(`0x${color.slice(3, 4)}`)
  const blue = Number(`0x${color.slice(5, 6)}`)
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#000000' : '#ffffff'
}

export { stringToColor, stringToShade }
