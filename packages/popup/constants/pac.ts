export enum PacType {
  url = 0,
  text = 1,
}

export const pacDefaultValues = {
  [PacType.url]: '',
  [PacType.text]: `function FindProxyForURL(url, host) {
  if (dnsDomainIs(host, '.mozila.org')) {
    return 'PROXY w3proxy.mozilla.org:8080; DIRECT';
  }
  return 'DIRECT';
}`,
}
