<script setup lang="ts">
import { watchEffect, ref, computed, defineAsyncComponent } from 'vue'
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import type { ImportMap, OutputModes, ReplProps } from '@vue/repl'
import { EnumUICategory } from '../utils/type';
import { getImportsByCategory, getPreviewOptionsByCategory } from './helper';

const Codemirror = defineAsyncComponent(() => import('@vue/repl/codemirror-editor'))

// retrieve some configuration options from the URL
const query = new URLSearchParams(location.search)

const category = ref(query.get('category') as EnumUICategory)

const { importMap, vueVersion, productionMode } = useVueImportMap({
  vueVersion: 'latest',
  runtimeDev: 'https://fastly.jsdelivr.net/npm/@vue/runtime-dom@latest/dist/runtime-dom.esm-browser.js',
  runtimeProd: 'https://fastly.jsdelivr.net/npm/@vue/runtime-dom@latest/dist/runtime-dom.esm-browser.prod.js'
})

const builtinImportMap = computed<ImportMap>(() => {
  const { imports = {}, scopes = {} } = importMap.value
  return {
    imports: {
      ...imports,
      ...getImportsByCategory(category.value)
    },
    scopes: {
      ...scopes,
    },
  }
})
const previewOptions = computed<ReplProps['previewOptions']>(() => getPreviewOptionsByCategory(category.value))

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
