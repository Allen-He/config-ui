import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

const resolvePath = (src: string) => path.resolve(__dirname, src)

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
  build: {
    target: 'esnext',
    lib: {
      entry: resolvePath('./src/index.ts'),
      cssFileName: 'style',
    },
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: resolvePath('./dist/es'),
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'cjs',
          dir: resolvePath('./dist/lib'),
          preserveModules: true,
          preserveModulesRoot: 'src',
          minifyInternalExports: false,
          externalLiveBindings: false,
          entryFileNames: '[name].js',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'iife',
          dir: resolvePath('./dist/browser'),
          name: 'ElementPlusConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'umd',
          dir: resolvePath('./dist/browser'),
          name: 'ElementPlusConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'es',
          dir: resolvePath('./dist/browser'),
          name: 'ElementPlusConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      ],
    },
  },
})
