import { defineConfig } from 'vitepress'
import mdContainer from 'markdown-it-container'
import { createDemoContainer } from '../_core/DemoContainer/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'config-ui',
  description: '灵活易用的业务组件库',
  base: '/config-ui/',
  head: [
    ['link', { rel: 'icon', href: '/config-ui/logo.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/logo.svg', width: 24, height: 24 },

    nav: [
      { text: '快速开始', link: '/guide' },
      { text: '更新日志', link: '/changelog' },
      {
        text: '组件列表',
        items: [
          { text: 'ElementPlusConfig', link: '/element-plus-config/' },
          { text: 'AntDesignVueConfig', link: '/ant-design-vue-config/' },
          { text: 'Shared', link: '/shared' },
        ],
      },
    ],
    sidebar: [
      { text: '快速开始', link: '/guide' },
      { text: '更新日志', link: '/changelog' },
      {
        text: '组件列表',
        items: [
          {
            text: 'ElementPlusConfig',
            link: '/element-plus-config/',
            items: [
              { text: 'ConfigForm', link: '/element-plus-config/ConfigForm' },
              { text: 'ConfigSearchPage', link: '/element-plus-config/ConfigSearchPage' },
              { text: 'HelloWorld', link: '/element-plus-config/HelloWorld' },
            ],
          },
          {
            text: 'AntDesignVueConfig',
            link: '/ant-design-vue-config/',
            items: [
              { text: 'HelloWorld', link: '/ant-design-vue-config/HelloWorld' }
            ],
          },
          {
            text: 'Shared',
            link: '/shared/',
            items: [
              { text: 'Hooks', link: '/shared/hooks'}
            ]
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'juejin',
        link: 'https://juejin.cn/user/2410580264357357/posts',
      },
      {
        icon: 'csdn',
        link: 'https://blog.csdn.net/weixin_47516343'
      },
      {
        icon: 'github',
        link: 'https://github.com/Allen-He/config-ui',
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Allen He'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  },
  lastUpdated: true,
  markdown: {
    config: (md) => {
      md.use(mdContainer, 'demo', createDemoContainer(md))
    },
  },
})
