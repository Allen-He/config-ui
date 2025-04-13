import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vitest.config.ts",
  "./packages/docs/vite.config.ts",
  "./packages/ant-design-config/vite.config.ts",
  "./packages/element-plus-config/vite.config.ts"
])
