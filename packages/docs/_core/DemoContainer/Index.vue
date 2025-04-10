<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef, useTemplateRef } from 'vue'
import { isClient, useClipboard, useToggle } from '@vueuse/core'
import { EVENT_CODE } from 'element-plus'
import { CaretTop } from '@element-plus/icons-vue'
import { useSourceCode } from './helper'

const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description: string
}>()

const vm = getCurrentInstance()!

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, toggleSourceVisible] = useToggle()

const sourceDecoded = computed(() => decodeURIComponent(props.source))

const demoSourceUrl = useSourceCode(toRef(props, 'path'))

const sourceCodeRef = ref<HTMLButtonElement>()

const decodedDescription = computed(() => decodeURIComponent(props.description))

const onPlaygroundClick = () => {
  if (!isClient) return
  alert('Comming soon!!!')
}

const showcaseRef = useTemplateRef('showcaseRef')
const onFullscreenClick = () => {
  showcaseRef.value?.requestFullscreen()

  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    showcaseRef.value?.requestFullscreen()
  }
}

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error('This browser does not support automatic copy！')
  }
  try {
    await copy()
    $message.success('Copied!')
  } catch (e: any) {
    $message.error(e.message)
  }
}
</script>

<template>
  <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
  <div text="sm" m="y-4" v-html="decodedDescription" />

  <div class="example">
    <div class="example-showcase" ref="showcaseRef">
      <slot name="source" />
    </div>

    <ElDivider style="margin: 0" />

    <div class="op-btns">
      <ElTooltip :content="'Fullscreen'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <ElIcon
          :size="16"
          :aria-label="'Fullscreen'"
          tabindex="0"
          role="link"
          class="op-btn"
          @click="onFullscreenClick"
          @keydown.prevent.enter="onFullscreenClick"
          @keydown.prevent.space="onFullscreenClick"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z"
            ></path>
          </svg>
        </ElIcon>
      </ElTooltip>
      <ElTooltip :content="'Edit in Playground'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <ElIcon
          :size="16"
          :aria-label="'Edit in Playground'"
          tabindex="0"
          role="link"
          class="op-btn"
          @click="onPlaygroundClick"
          @keydown.prevent.enter="onPlaygroundClick"
          @keydown.prevent.space="onPlaygroundClick"
        >
          <svg data-v-5009ca8d="" viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path
              fill="currentColor"
              d="M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276A1.5 1.5 0 0 1 18.656 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.282-9.276A7.994 7.994 0 0 0 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567a9.978 9.978 0 0 1-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058a8.777 8.777 0 0 1-.021-.364L13 7.243V4h-2v3.243z"
            ></path>
          </svg>
        </ElIcon>
      </ElTooltip>
      <ElTooltip :content="'Edit on GitHub'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <ElIcon :size="16" class="op-btn github" style="color: var(--text-color-light)">
          <a :href="demoSourceUrl" :aria-label="'Edit on GitHub'" rel="noreferrer noopener" target="_blank">
            <svg data-v-5009ca8d="" viewBox="0 0 24 24" width="1.2em" height="1.2em">
              <path
                fill="currentColor"
                d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588c-.094-.117.34.427.433.539c.19.227.33.365.44.438c.204.137.587.196 1.15.14c.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292c-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047c.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308c1.477-.933 2.613-1.226 3.422-1.096c.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19c.691.936 1.058 2.045 1.058 3.293c0 3.757-1.674 5.665-4.642 6.392c.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716a1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446l.005-.705c.005-.708.007-1.338.007-1.998c0-.697-.183-1.152-.425-1.36c-.661-.57-.326-1.655.54-1.752c2.967-.333 4.337-1.482 4.337-4.66c0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947c-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66c.865.097 1.201 1.177.544 1.748c-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"
              ></path>
            </svg>
          </a>
        </ElIcon>
      </ElTooltip>
      <ElTooltip :content="'Copy code'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <ElIcon
          :size="16"
          :aria-label="'Copy code'"
          class="op-btn"
          tabindex="0"
          role="button"
          @click="copyCode"
          @keydown.prevent.enter="copyCode"
          @keydown.prevent.space="copyCode"
        >
          <svg data-v-5009ca8d="" viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path
              fill="currentColor"
              d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
            ></path>
          </svg>
        </ElIcon>
      </ElTooltip>
      <ElTooltip :content="'View source'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <button
          ref="sourceCodeRef"
          :aria-label="sourceVisible ? 'Hide source' : 'View source'"
          class="reset-btn el-icon op-btn"
          @click="toggleSourceVisible()"
        >
          <ElIcon :size="16">
            <svg data-v-5009ca8d="" viewBox="0 0 24 24" width="1.2em" height="1.2em">
              <path
                fill="currentColor"
                d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
              ></path>
            </svg>
          </ElIcon>
        </button>
      </ElTooltip>
    </div>

    <ElCollapseTransition>
      <div v-show="sourceVisible" class="example-source-wrapper">
        <div class="example-source" v-html="sourceDecoded" />
      </div>
    </ElCollapseTransition>

    <Transition name="el-fade-in-linear">
      <div
        v-show="sourceVisible"
        class="example-float-control"
        tabindex="0"
        role="button"
        @click="toggleSourceVisible(false)"
        @keydown="onSourceVisibleKeydown"
      >
        <ElIcon :size="16">
          <CaretTop />
        </ElIcon>
        <span>{{ 'Hide source' }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  .example-showcase {
    padding: 1.5rem;
    margin: 0.5px;
    background-color: var(--el-bg-color);
  }

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--el-text-color-primary);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--el-text-color-secondary);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--el-text-color-secondary);

        &:hover {
          color: var(--el-text-color-primary);
        }
      }
    }
  }

  :deep(.language-vue) {
    margin: 0 !important;
    border-radius: 0 !important;
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--el-border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--el-bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }

  // note: 临时解决来自“.vp-doc table”的样式污染，后续考虑使用 whyframe（https://whyframe.dev/docs/integrations/vitepress）
  :deep(table) {
    // display: block;
    // border-collapse: collapse;
    // margin: 20px 0;
    // overflow-x: auto;
    margin: unset;
    overflow-x: unset;
  }
}
</style>
