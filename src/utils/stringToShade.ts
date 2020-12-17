import Jimp from 'jimp'
import stringToColor from 'string-to-color'

const stringToShade = (text: string) => {
  const color = stringToColor(text)
  const hex = Jimp.cssColorToHex(color)
  const rgb = Jimp.intToRGBA(hex)
  return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186 ? '#000000' : '#ffffff'
}

export default stringToShade
