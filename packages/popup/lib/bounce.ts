export const createBounce = () => {
  let bouncer: number | undefined

  const bounce = async (handler: () => void, timeout?: number) => {
    window.clearTimeout(bouncer)
    bouncer = window.setTimeout(handler, timeout)
  }

  return bounce
}
