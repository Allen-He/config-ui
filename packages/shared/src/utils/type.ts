import type { Ref, ToRefs } from 'vue'

export type UnionKey<T = any> = keyof T & string

export type RecordObj = Record<string, any>

export type WithRef<T = any> = T | Ref<T>

export type WithRefs<T = any> = T | ToRefs<T>
