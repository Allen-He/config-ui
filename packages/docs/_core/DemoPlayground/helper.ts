import type { ReplProps } from '@vue/repl'
import { EnumUICategory } from '../utils/type'

export const getImportsByCategory = (category: EnumUICategory): Record<string, string> => {
  let resImports: Record<string, string> = {
    '@config-ui/shared': 'https://unpkg.com/@config-ui/shared@latest/dist/es/index.js',
    '@config-ui/shared/': 'https://unpkg.com/@config-ui/shared@latest/',
  }
  if (category === EnumUICategory.ElementPlus) {
    resImports = {
      'element-plus': 'https://unpkg.com/element-plus@latest/dist/index.full.min.mjs',
      'element-plus/': 'https://unpkg.com/element-plus@latest/',
      '@element-plus/icons-vue': 'https://unpkg.com/@element-plus/icons-vue@2/dist/index.min.js',
      '@config-ui/element-plus-config': 'https://unpkg.com/@config-ui/element-plus-config@latest/dist/es/index.js',
      '@config-ui/element-plus-config/': 'https://unpkg.com/@config-ui/element-plus-config@latest/',
      ...resImports,
    }
  }
  if (category === EnumUICategory.AntDesignVue) {
    resImports = {
      'ant-design-vue': 'https://unpkg.com/ant-design-vue@latest/dist/antd.esm.min.js',
      'ant-design-vue/': 'https://unpkg.com/ant-design-vue@latest/',
      '@ant-design/icons-vue': 'https://unpkg.com/@ant-design/icons-vue@latest/lib/index.min.js',
      '@config-ui/ant-design-vue-config': 'https://unpkg.com/@config-ui/ant-design-vue-config@latest/dist/es/index.js',
      '@config-ui/ant-design-vue-config/': 'https://unpkg.com/@config-ui/ant-design-vue-config@latest/',
      ...resImports,
    }
  }
  return resImports
}

export const getPreviewOptionsByCategory = (category: EnumUICategory): ReplProps['previewOptions'] => {
  if (category === EnumUICategory.ElementPlus) {
    return {
      headHTML: `
        <link rel="stylesheet" href="https://unpkg.com/element-plus@latest/dist/index.css">
        <link rel="stylesheet" href="https://unpkg.com/@config-ui/element-plus-config@latest/dist/es/style.css">
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
        <link rel="stylesheet" href="https://unpkg.com/ant-design-vue@latest/dist/reset.css">
        <link rel="stylesheet" href="https://unpkg.com/@config-ui/ant-design-vue-config@latest/dist/es/style.css">
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
