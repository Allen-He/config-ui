import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'

export const resolvePath = (src: string) => path.resolve(__dirname, src)

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    }),
    dts({
      entryRoot: resolvePath('./src'),
      outDir: [resolvePath('./dist/es'), resolvePath('./dist/lib')],
      tsconfigPath: resolvePath('../../tsconfig.app.json'),
    }),
  ],
})
