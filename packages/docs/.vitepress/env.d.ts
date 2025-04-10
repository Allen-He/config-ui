/// <reference types="vite/client" />

interface ImportMetaEnv {
  SSR: boolean
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
