export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Optional<T> = { [key in keyof T]?: T[key] }