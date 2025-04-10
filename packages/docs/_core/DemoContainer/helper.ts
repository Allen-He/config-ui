import { computed } from 'vue'
import { useData } from 'vitepress'
import type { Ref } from 'vue'

const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i
const ENDING_SLASH_RE = /\/$/

function isExternal(path) {
  return EXTERNAL_URL_RE.test(path)
}

function createGitHubUrl(
  docsRepo: string,
  docsDir: string,
  docsBranch: string,
  path: string,
  folder = 'examples/',
  ext = '.vue',
) {
  const base = isExternal(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`
  return `${base.replace(ENDING_SLASH_RE, '')}/edit/${docsBranch}/${
    docsDir ? `${docsDir.replace(ENDING_SLASH_RE, '')}/` : ''
  }${folder || ''}${path}${ext || ''}`
}

export const useSourceCode = (path: Ref<string>) => {
  const { theme } = useData()

  const demoUrl = computed(() => {
    const { repo, docsDir = '', docsBranch = 'dev', docsRepo = repo } = theme.value

    return createGitHubUrl(docsRepo, docsDir, docsBranch, path.value)
  })

  return demoUrl
}
