<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { FullScreen } from '@element-plus/icons-vue'

const demoWrapRef = useTemplateRef('demoWrapRef')

const fullScreenHandle = () => {
  demoWrapRef.value?.requestFullscreen()

  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    demoWrapRef.value?.requestFullscreen()
  }
}
</script>

<template>
  <div class="demo-wrap" ref="demoWrapRef">
    <client-only>
      <slot></slot>
    </client-only>
    <div class="tools">
      <el-button :icon="FullScreen" circle @click="fullScreenHandle"></el-button>
    </div>
  </div>
</template>

<style lang="scss">
.demo-wrap {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: #fff;
  position: relative;

  .tools {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    left: 20px;
    bottom: 20px;
  }

  // note: 临时解决来自“.vp-doc table”的样式污染，后续考虑使用 whyframe（https://whyframe.dev/docs/integrations/vitepress）
  table {
    // display: block;
    // border-collapse: collapse;
    // margin: 20px 0;
    // overflow-x: auto;
    margin: unset;
    overflow-x: unset;
  }
}
</style>
