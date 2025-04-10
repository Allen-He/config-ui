// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'element-plus/dist/index.css'

import DemoContainer from '../../_core/DemoContainer/Index.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('DemoContainer', DemoContainer)

    // client only
    if (!import.meta.env.SSR) {
      import('element-plus').then((ElementPlus) => {
        app.use(ElementPlus)
      })
    }
  },
} satisfies Theme
