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
      external: ['vue', 'ant-design-vue'],
      output: [
        {
          format: 'iife',
          dir: resolvePath('./dist/browser'),
          entryFileNames: 'index.iife.js',
          name: 'AntDesignVueConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
            'ant-design-vue': 'AntDesignVue',
          },
        },
        {
          format: 'umd',
          dir: resolvePath('./dist/browser'),
          entryFileNames: 'index.umd.js',
          name: 'AntDesignVueConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
            'ant-design-vue': 'AntDesignVue',
          },
        },
        {
          format: 'es',
          dir: resolvePath('./dist/browser'),
          entryFileNames: 'index.es.js',
          name: 'AntDesignVueConfig',
          exports: 'named',
          globals: {
            vue: 'Vue',
            'ant-design-vue': 'AntDesignVue',
          },
        },
      ],
    },
  },
})
