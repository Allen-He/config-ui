<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { isClient, useClipboard, useToggle } from '@vueuse/core'
import { ElMessage, EVENT_CODE } from 'element-plus'
import { CaretTop } from '@element-plus/icons-vue'

const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description: string
}>()

const descriptionDecoded = computed(() => decodeURIComponent(props.description))

const showcaseRef = useTemplateRef('showcaseRef')
const onFullscreenClick = () => {
  showcaseRef.value?.requestFullscreen()

  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    showcaseRef.value?.requestFullscreen()
  }
}

const onPlaygroundClick = () => {
  if (!isClient) return
  alert('Comming soon!!!')
}

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})
const copyCode = async () => {
  if (!isSupported) {
    ElMessage.error('This browser does not support automatic copy！')
  }
  try {
    await copy()
    ElMessage.success('Copied!')
  } catch (e: any) {
    ElMessage.error(e.message)
  }
}

const [sourceVisible, toggleSourceVisible] = useToggle()
const sourceDecoded = computed(() => decodeURIComponent(props.source))
const sourceCodeRef = useTemplateRef('sourceCodeRef')

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}
</script>

<template>
  <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
  <div v-html="descriptionDecoded" />

  <div class="example">
    <div class="example-showcase vp-raw" ref="showcaseRef">
      <slot name="source" />
    </div>

    <el-divider style="margin: 0" />

    <div class="op-btns">
      <el-tooltip :content="'Fullscreen'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <el-icon
          :size="16"
          :aria-label="'Fullscreen'"
          tabindex="0"
          role="button"
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
        </el-icon>
      </el-tooltip>
      <el-tooltip :content="'Edit in Playground'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <el-icon
          :size="16"
          :aria-label="'Edit in Playground'"
          tabindex="0"
          role="link"
          class="op-btn"
          @click="onPlaygroundClick"
          @keydown.prevent.enter="onPlaygroundClick"
          @keydown.prevent.space="onPlaygroundClick"
        >
          <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path
              fill="currentColor"
              d="M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276A1.5 1.5 0 0 1 18.656 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.282-9.276A7.994 7.994 0 0 0 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567a9.978 9.978 0 0 1-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058a8.777 8.777 0 0 1-.021-.364L13 7.243V4h-2v3.243z"
            ></path>
          </svg>
        </el-icon>
      </el-tooltip>
      <el-tooltip :content="'Copy Code'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <el-icon
          :size="16"
          :aria-label="'Copy Code'"
          tabindex="0"
          role="button"
          class="op-btn"
          @click="copyCode"
          @keydown.prevent.enter="copyCode"
          @keydown.prevent.space="copyCode"
        >
          <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path
              fill="currentColor"
              d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
            ></path>
          </svg>
        </el-icon>
      </el-tooltip>
      <el-tooltip :content="'View source'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <button
          ref="sourceCodeRef"
          :aria-label="sourceVisible ? 'Hide source' : 'View source'"
          class="reset-btn el-icon op-btn"
          @click="toggleSourceVisible()"
        >
          <el-icon :size="16">
            <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
              <path
                fill="currentColor"
                d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
              ></path>
            </svg>
          </el-icon>
        </button>
      </el-tooltip>
    </div>

    <el-collapse-transition>
      <div v-show="sourceVisible" class="example-source-wrapper">
        <div class="example-source" v-html="sourceDecoded" />
      </div>
    </el-collapse-transition>

    <transition name="el-fade-in-linear">
      <div
        v-show="sourceVisible"
        class="example-float-control"
        tabindex="0"
        role="button"
        @click="toggleSourceVisible(false)"
        @keydown="onSourceVisibleKeydown"
      >
        <el-icon :size="16">
          <CaretTop />
        </el-icon>
        <span>{{ 'Hide source' }}</span>
      </div>
    </transition>
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
}
</style>
