/**
 * 匹配 <script setup>，同时也支持 lang="ts" 的写法
 */
const scriptTsSetupRegx = /<\s*script[^>]*\bsetup\b[^>]*>|<\s*script[^>]*\blang=["']ts["'][^>]*\bsetup\b[^>]*>/

/**
 * 向 Markdown 文件中注入 <script> 脚本块
 * @param env - 包含解析后的 Markdown 数据的环境对象
 * @param importName - 要导入的模块
 * @param importPath - 要导入的模块路径
 *
 */
export const injectImportScript = (env: any, importPath: string, importName?: string) => {
  const scriptsCode = env.sfcBlocks.scripts as any[]

  // 根据导入类型生成“导入语句”
  const importCode = importName ? `import ${importName} from '${importPath}'` : `import '${importPath}'`

  // 检查是否已存在 <script setup> 块
  const setupScriptExist = scriptsCode.some((script: any) => scriptTsSetupRegx.test(script.tagOpen))

  if (setupScriptExist) {
    // 如果已存在 <script setup> 块，则插入“导入语句”
    insertSetupScript(scriptsCode[0], importCode)
  } else {
    // 如果不存在 <script setup> 块，则创建一个新的
    scriptsCode.unshift(createSetupScript(importCode))
  }
}

/**
 * 创建一个新的 <script setup> 块
 * @param importCode - 要包含在块中的导入“导入语句”
 * @returns 新的脚本块对象
 */
const createSetupScript = (importCode: string) => ({
  type: 'script',
  tagOpen: '<script setup>',
  tagClose: '</script>',
  content: `<script setup>\n${importCode}\n</script>`,
  contentStripped: importCode,
})

/**
 * 插入“导入语句”到已有的 <script setup> 块中
 * @param scriptBlock - 已有的脚本块
 * @param importCode - 要插入的“导入语句”
 */
const insertSetupScript = (scriptBlock: any, importCode: string) => {
  if (scriptBlock.content.includes(importCode)) return
  scriptBlock.content = scriptBlock.content.replace(scriptTsSetupRegx, `<script setup>\n${importCode}\n`)
}

interface ContainerInfo {
  containerName: string; // 容器名称，例如 'demo'
  containerProps: Record<string, string>; // 容器属性，例如 { category: 'element-plus', description: 'hhh' }
}

/**
 * 解析 Markdown 容器的属性
 * @param info Markdown容器的信息字符串，例如：'demo category="element-plus" description="hhh"'
 */
export const parseMarkdownContainerInfo = (info: string): ContainerInfo | undefined => {
  // 匹配容器名称
  const containerMatch = info.trim().match(/^(\w+)(.*)$/)
  if (!containerMatch) return;
  const [, containerName, rest] = containerMatch
  // 匹配容器属性
  const attrMatches = rest.trim().matchAll(/(\w+)="([^"]*)"/g)
  const containerProps: Record<string, string> = {}
  for (const match of attrMatches) {
    const [, key, value] = match
    containerProps[key] = value
  }
  return { containerName, containerProps }
}
