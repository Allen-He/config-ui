import path, { basename, dirname } from 'path'
import fs from 'fs'
import type { MarkdownRenderer } from 'vitepress'

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
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(path.resolve(dirname(env.path), sourceFile), 'utf-8')
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        const [componentName, ext = 'vue'] = basename(sourceFile).split('.', 2)

        return `
          <DemoContainer
            source="${encodeURIComponent(md.render(`\`\`\` ${ext}\n${source}\`\`\``))}"
            path="${sourceFile}"
            raw-source="${encodeURIComponent(source)}"
            description="${encodeURIComponent(md.render(description))}"
          >
            <template #source><${componentName} /></template>`
      } else {
        return '</DemoContainer>\n'
      }
    },
  }
}
