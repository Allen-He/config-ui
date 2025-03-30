import { defineConfig } from 'vitepress'

const menus = [
  { text: 'HelloWorld', link: '/element-plus-config/HelloWorld' },
  { text: 'ConfigForm', link: '/element-plus-config/ConfigForm' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'config-ui',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '快速开始', link: '/guide' },
      { text: '更新日志', link: '/changelog' },
      {
        text: '组件列表',
        items: menus,
      },
    ],
    sidebar: [
      { text: '快速开始', link: '/guide' },
      { text: '更新日志', link: '/changelog' },
      {
        text: '组件列表',
        items: menus,
      },
    ],

    socialLinks: [
      {
        ariaLabel: 'GitHub',
        link: 'https://github.com/Allen-He',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      },
    ],

    search: {
      provider: 'local',
    },
  },
  lastUpdated: true,
  outDir: '../dist/docs',
})
