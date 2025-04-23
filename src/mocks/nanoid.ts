// This is a simplified version of nanoid for generating unique IDs in our mock server

export function nanoid(size = 21): string {
  const urlAlphabet =
    'ModuleSymbhasOwnPr0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'
  let id = ''
  let i = size
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0]
  }
  return id
}
