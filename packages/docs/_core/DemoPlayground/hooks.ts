import { isDark } from '../utils/dark'
import type { EnumUICategory } from '../utils/type'

export type Link = {
  text: string
  link: string
  promotion?: string
  activeMatch: string
}

const MAIN_FILE_NAME = 'App.vue'

export const useDemoPlayground = (source: string, category: EnumUICategory) => {
  const code = source ? decodeURIComponent(source) : source
  const originCode = {
    [MAIN_FILE_NAME]: code,
  }

  const encoded = code ? btoa(unescape(encodeURIComponent(JSON.stringify(originCode)))) : ''

  let link = `${location.origin}/config-ui/playground/?category=${category}`

  if (isDark.value) {
    link = `${link}&theme=dark`
  }

  if (code) {
    link += `#${encoded}`
  }

  return {
    encoded,
    link,
  }
}
