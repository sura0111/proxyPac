export enum PacType {
  url = 0,
  text = 1,
}

export const pacDefaultValues = {
  [PacType.url]: '',
  [PacType.text]: `function FindProxyForURL(url, host) {
  return 'DIRECT';
}`,
}
