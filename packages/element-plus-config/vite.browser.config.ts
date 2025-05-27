import { defineConfig } from 'vite'
import viteBaseConfig, { resolvePath } from './vite.base.config'

export default defineConfig({
  ...viteBaseConfig,
  build: {
    target: 'esnext',
    lib: {
      entry: resolvePath('./src/index.ts'),
      cssFileName: 'style',
    },
    emptyOutDir: true,
    minify: true, // minify the output files
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: [
        {
          format: 'iife',
          dir: resolvePath('./dist/browser'),
          entryFileNames: 'index.iife.js',
          name: 'ElementPlusConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus',
          },
        },
        {
          format: 'umd',
          dir: resolvePath('./dist/browser'),
          entryFileNames: 'index.umd.js',
          name: 'ElementPlusConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus',
          },
        },
        {
          format: 'es',
          dir: resolvePath('./dist/browser'),
          entryFileNames: 'index.es.js',
          name: 'ElementPlusConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus',
          },
        },
      ],
    },
  },
})
