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
      ],
    },
  },
})
