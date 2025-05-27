import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

export const resolvePath = (src: string) => path.resolve(__dirname, src)

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: resolvePath('./src'),
      outDir: [resolvePath('./dist/es'), resolvePath('./dist/lib')],
      tsconfigPath: resolvePath('../../tsconfig.app.json'),
    }),
  ],
})
