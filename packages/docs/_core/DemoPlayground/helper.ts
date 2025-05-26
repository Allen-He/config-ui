import type { ReplProps } from '@vue/repl'
import { EnumUICategory } from '../utils/type'

export const getImportsByCategory = (category: EnumUICategory): Record<string, string> => {
  let resImports: Record<string, string> = {
    '@config-ui/shared': 'https://fastly.jsdelivr.net/npm/@config-ui/shared@latest/dist/es/index.min.js',
    '@config-ui/shared/': 'https://fastly.jsdelivr.net/npm/@config-ui/shared@latest/',
  }
  if (category === EnumUICategory.ElementPlus) {
    resImports = {
      'element-plus': 'https://fastly.jsdelivr.net/npm/element-plus@latest/dist/index.full.min.mjs',
      'element-plus/': 'https://fastly.jsdelivr.net/npm/element-plus@latest/',
      '@element-plus/icons-vue': 'https://fastly.jsdelivr.net/npm/@element-plus/icons-vue@2/dist/index.min.js',
      '@config-ui/element-plus-config':
        'https://fastly.jsdelivr.net/npm/@config-ui/element-plus-config@latest/dist/es/index.min.js',
      '@config-ui/element-plus-config/': 'https://fastly.jsdelivr.net/npm/@config-ui/element-plus-config@latest/',
      ...resImports,
    }
  }
  if (category === EnumUICategory.AntDesignVue) {
    resImports = {
      'ant-design-vue': 'https://fastly.jsdelivr.net/npm/ant-design-vue@latest/dist/antd.esm.min.js',
      'ant-design-vue/': 'https://fastly.jsdelivr.net/npm/ant-design-vue@latest/',
      '@ant-design/icons-vue': 'https://fastly.jsdelivr.net/npm/@ant-design/icons-vue@latest/lib/index.min.js',
      '@config-ui/ant-design-vue-config':
        'https://fastly.jsdelivr.net/npm/@config-ui/ant-design-vue-config@latest/dist/es/index.min.js',
      '@config-ui/ant-design-vue-config/': 'https://fastly.jsdelivr.net/npm/@config-ui/ant-design-vue-config@latest/',
      ...resImports,
    }
  }
  return resImports
}

export const getPreviewOptionsByCategory = (category: EnumUICategory): ReplProps['previewOptions'] => {
  if (category === EnumUICategory.ElementPlus) {
    return {
      headHTML: `
        <link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/element-plus@latest/dist/index.css">
        <link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/@config-ui/element-plus-config@latest/dist/es/style.css">
        <style>
          #app {
            padding: 10px;
          }
        </style>
      `,
      customCode: {
        importCode: `
          import { createApp } from 'vue'
          import ElementPlus from 'element-plus'
        `,
        useCode: `
          app.use(ElementPlus)
        `,
      },
    }
  }
  if (category === EnumUICategory.AntDesignVue) {
    return {
       headHTML: `
        <link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/ant-design-vue@latest/dist/reset.css">
        <link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/@config-ui/ant-design-vue-config@latest/dist/es/style.css">
        <style>
          #app {
            padding: 10px;
          }
        </style>
      `,
      customCode: {
        importCode: `
          import { createApp } from 'vue'
          import * as Antd from 'ant-design-vue'
        `,
        useCode: `
          for (const AntdComp in Antd) {
            app.component(AntdComp, Antd[AntdComp]);
          }
        `,
      },
    }
  }
}
