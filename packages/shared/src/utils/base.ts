export const isNil = (value: unknown): value is null | undefined => {
  return value === null || value === undefined
}

export const isEmpty = (value: unknown): value is '' | null | undefined | [] => {
  if (Array.isArray(value)) {
    return value.length === 0
  }
  return value === '' || isNil(value)
}
