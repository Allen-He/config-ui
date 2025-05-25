<script setup lang="ts">
import { watchEffect, ref, computed } from 'vue'
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import Codemirror from '@vue/repl/codemirror-editor'
import type { ImportMap, OutputModes, ReplProps } from '@vue/repl'

// retrieve some configuration options from the URL
const query = new URLSearchParams(location.search)

const { importMap, vueVersion, productionMode } = useVueImportMap({
  vueVersion: 'latest',
  runtimeDev: 'https://cdn.jsdelivr.net/npm/@vue/runtime-dom@latest/dist/runtime-dom.esm-browser.js',
  runtimeProd: 'https://cdn.jsdelivr.net/npm/@vue/runtime-dom@latest/dist/runtime-dom.esm-browser.prod.js'
})

const builtinImportMap = computed<ImportMap>(() => {
  const { imports = {}, scopes = {} } = importMap.value
  return {
    imports: {
      ...imports,
      'ant-design-vue': 'https://cdn.jsdelivr.net/npm/ant-design-vue@latest/dist/antd.esm.min.js',
      'ant-design-vue/': 'https://cdn.jsdelivr.net/npm/ant-design-vue@latest/',
      '@ant-design/icons-vue': 'https://cdn.jsdelivr.net/npm/@ant-design/icons-vue@latest/lib/index.min.js',

      'element-plus': 'https://cdn.jsdelivr.net/npm/element-plus@latest/dist/index.full.min.mjs',
      'element-plus/': 'https://cdn.jsdelivr.net/npm/element-plus@latest/',
      '@element-plus/icons-vue': 'https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2/dist/index.min.js',

      '@config-ui/element-plus-config': 'https://cdn.jsdelivr.net/npm/@config-ui/element-plus-config@latest/dist/es/index.min.js',
      '@config-ui/element-plus-config/': 'https://cdn.jsdelivr.net/npm/@config-ui/element-plus-config@latest/',

      '@config-ui/ant-design-vue-config': 'https://cdn.jsdelivr.net/npm/@config-ui/ant-design-vue-config@latest/dist/es/index.min.js',
      '@config-ui/ant-design-vue-config/': 'https://cdn.jsdelivr.net/npm/@config-ui/ant-design-vue-config@latest/',

      '@config-ui/shared': 'https://cdn.jsdelivr.net/npm/@config-ui/shared@latest/dist/es/index.min.js',
      '@config-ui/shared/': 'https://cdn.jsdelivr.net/npm/@config-ui/shared@latest/',
    },
    scopes: {
      ...scopes,
    },
  }
})

const previewOptions = ref<ReplProps['previewOptions']>({
  headHTML: `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ant-design-vue@latest/dist/reset.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@config-ui/ant-design-vue-config@latest/dist/es/style.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus@latest/dist/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@config-ui/element-plus-config@latest/dist/es/style.css">

    <style>
      #app {
        padding: 10px;
      }
    </style>
  `,
  customCode: {
    importCode: `
      import { createApp } from 'vue'
      import * as Antd from 'ant-design-vue'
      import ElementPlus from 'element-plus'
    `,
    useCode: `
      for (const AntdComp in Antd) {
        app.component(AntdComp, Antd[AntdComp]);
      }
      app.use(ElementPlus)
    `
  }
})

const store = useStore(
  {
    // pre-set import map
    builtinImportMap,
    vueVersion,
    // starts on the output pane (mobile only) if the URL has a showOutput query
    showOutput: ref(query.has('showOutput')),
    // starts on a different tab on the output pane if the URL has a outputMode query
    // and default to the "preview" tab
    outputMode: ref((query.get('outputMode') || 'preview') as OutputModes),
  },
  // initialize repl with previously serialized state
  location.hash,
)

// persist state to URL hash
watchEffect(() => history.replaceState({}, '', store.serialize()))

// production mode is enabled
productionMode.value = true
</script>

<template>
  <div class="playground-wrap">
    <Repl :store="store" :editor="Codemirror" :previewOptions="previewOptions" />
  </div>
</template>

<style scoped lang="scss">
.playground-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
}
</style>
