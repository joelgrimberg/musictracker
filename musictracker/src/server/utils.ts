// sorry typescript
export function mapNullableValuesToOptionals<T extends object>(data: T): {
  [key in keyof T]: null extends T[key] ? Exclude<T[key], null> | undefined : T[key]
} {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null)) as {
    [key in keyof T]: null extends T[key] ? Exclude<T[key], null> | undefined : T[key]
  }
}