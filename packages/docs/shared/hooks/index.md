# Hooks

## useVisible

`useVisible` 是一个用于管理组件显示与隐藏状态的 Hook，通常用于弹窗、抽屉等需要控制可见性的场景。

### 使用方法

```typescript
import { useVisible } from '@config-ui/shared';

const { visible, show, hide, toggle } = useVisible();

// visible: 当前的可见状态 (boolean)
// show: 显示组件的方法
// hide: 隐藏组件的方法
// toggle: 切换组件可见状态的方法
```

### 示例

```vue
<template>
  <div>
    <button @click="show">显示弹窗</button>
    <button @click="hide">隐藏弹窗</button>
    <button @click="toggle">切换弹窗</button>

    <div v-if="visible" class="modal">
      <p>这是一个弹窗</p>
      <button @click="hide">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { useVisible } from '@config-ui/shared/hooks';

const { visible, show, hide, toggle } = useVisible();
</script>
```

### 参数和返回值

- **参数**:
  - `initial` (可选): 设置 `visible` 的初始状态，类型为 `boolean`，默认为 `false`。

- **返回值**:
  - `visible`: 当前的可见状态，类型为 `boolean`。
  - `show`: 显示组件的方法。
  - `hide`: 隐藏组件的方法。
  - `toggle`: 切换组件可见状态的方法。

`useVisible` 提供了简单易用的 API，能够快速集成到各种场景中。
