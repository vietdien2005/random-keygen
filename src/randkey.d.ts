interface Options {
  length?: number
  numbers?: boolean
  symbols?: boolean
  uppercase?: boolean
  excludeSimilarCharacters?: boolean
  exclude?: string
  strict?: boolean
}
export function get (options?: Options): string
export function getMulti (amount: number, options?: Options): string[]
