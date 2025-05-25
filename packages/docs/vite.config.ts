import { defineConfig } from 'vite'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

const resolvePath = (src: string) => path.resolve(__dirname, src)

export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: [
      {
        find: '@config-ui/shared',
        replacement: resolvePath('../shared/src/index.ts'),
      },
      {
        find: '@config-ui/element-plus-config',
        replacement: resolvePath('../element-plus-config/src/index.ts'),
      },
      {
        find: '@config-ui/ant-design-vue-config',
        replacement: resolvePath('../ant-design-vue-config/src/index.ts'),
      },
    ],
  },
  optimizeDeps: {
    exclude: ['@vue/repl']
  },
  ssr: {
    noExternal: ['@vue/repl']
  }
})
