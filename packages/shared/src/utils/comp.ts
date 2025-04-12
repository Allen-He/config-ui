import type { App, Plugin } from 'vue'

export type ValueOf<T> = T[keyof T]

export type FormatEmits<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: T[K]
}

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T, E extends Record<string, any>, M extends Record<string, any>>(
  main: T,
  extra?: E,
  staticMethods?: M,
): SFCWithInstall<T> & E & M {
  ;(main as SFCWithInstall<T>).install = (app: App) => {
    ;[main, ...Object.values(extra || {})].forEach((comp) => {
      app.component(comp.name, comp)
    })
  }
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      // @ts-ignore
      ;(main as SFCWithInstall<T>)[key] = comp
    }
  }
  if (staticMethods) {
    Object.keys(staticMethods).forEach((key) => {
      // @ts-ignore
      ;(main as SFCWithInstall<T>)[key] = staticMethods[key]
    })
  }
  return main as SFCWithInstall<T> & E & M
}
