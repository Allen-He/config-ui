import path from 'path'
import fs from 'fs'
import type { MarkdownRenderer } from 'vitepress'
import { injectImportScript, parseMarkdownContainerInfo } from './helper'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?: MarkdownRenderer['renderer']['rules']['container']
}

export function createDemoContainer(md: MarkdownRenderer): ContainerOpts {
  return {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx, options, env, self) {
      const { containerProps = {} } = parseMarkdownContainerInfo(tokens[idx].info) || {}

      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const category = containerProps.category || ''
        const description = containerProps.description || ''
        const sourceFileToken = tokens[idx + 2]
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        const sourceFilePath = path.resolve(path.dirname(env.path), sourceFile)

        const [componentName, ext = 'vue'] = path.basename(sourceFile).split('.', 2)

        let source = ''
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(sourceFilePath, 'utf-8')
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        injectImportScript(env, sourceFile, componentName)

        return `
          <DemoContainer
            source="${encodeURIComponent(md.render(`\`\`\` ${ext}\n${source}\`\`\``))}"
            path="${sourceFile}"
            raw-source="${encodeURIComponent(source)}"
            description="${encodeURIComponent(md.render(description))}"
            category="${category}"
          >
            <template #source><${componentName} /></template>`
      } else {
        return '</DemoContainer>\n'
      }
    },
  }
}
