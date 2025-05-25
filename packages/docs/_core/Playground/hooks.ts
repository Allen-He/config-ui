import { isDark } from '../utils/dark'

export type Link = {
  text: string
  link: string
  promotion?: string
  activeMatch: string
}

const MAIN_FILE_NAME = 'App.vue'

export const usePlayground = (source: string) => {
  const code = source ? decodeURIComponent(source) : source
  const originCode = {
    [MAIN_FILE_NAME]: code,
  }

  const encoded = code ? btoa(unescape(encodeURIComponent(JSON.stringify(originCode)))) : ''

  let link = `${location.origin}/config-ui/playground/`

  if (isDark.value) {
    link = `${link}?theme=dark`
  }

  if (code) {
    link += `#${encoded}`
  }

  return {
    encoded,
    link,
  }
}
