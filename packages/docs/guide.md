# 快速开始

## ElementPlusConfig

基于 element-plus 二次封装的配置化页面组件库

### 安装

> 在此之前，你需要在项目中自行安装 [element-plus](https://element-plus.org/zh-CN/guide/installation.html)

::: code-group

```bash [npm]
npm i @config-ui/element-plus-config
```

```bash [pnpm]
pnpm add @config-ui/element-plus-config
```

```bash [yarn]
yarn add @config-ui/element-plus-config
```

:::

### 使用

1. 在入口文件`main.ts`导入样式文件

```typescript
import '@config-ui/element-plus-config/dist/es/style.css'
```

2. 按需引入业务组件

```vue
<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { ConfigForm } from '@config-ui/element-plus-config'
import type { ConfigFormConfig } from '@config-ui/element-plus-config'
import { ElMessage } from 'element-plus'

const formRef = useTemplateRef('formRef')

const formModel = ref({ name: undefined })

const formConfig = ref<ConfigFormConfig<typeof formModel.value>[]>([
  {
    field: 'name',
    formItemProps: {
      label: 'Activity name',
      prop: 'name',
      required: true,
    },
    component: 'ElInput',
    componentProps: {
      placeholder: 'Activity name',
    },
  },
])

const resetHandle = () => {
  formRef.value?.formRef?.resetFields()
}
const submitHandle = async () => {
  try {
    await formRef.value?.formRef?.validate()
    ElMessage.success('submit success')
  } catch (error: any) {
    ElMessage.error((Object.values(error) as any)?.[0]?.[0].message)
  }
}
</script>

<template>
  <div>
    <config-form
      ref="formRef"
      v-model="formModel"
      :form-config="formConfig"
      :form-raw-config="{ labelWidth: 'auto' }"
      :row-config="{ gutter: 15 }"
    />
    <div class="btn-box">
      <el-button type="default" @click="resetHandle">重置</el-button>
      <el-button type="primary" @click="submitHandle">提交</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
```

## AntDesignVueConfig

基于 ant-design-vue 二次封装的配置化页面组件库

### 安装

> 在此之前，你需要在项目中自行安装 [ant-design-vue](https://www.antdv.com/docs/vue/introduce-cn#%E5%AE%89%E8%A3%85)

::: code-group

```bash [npm]
npm i @config-ui/ant-design-vue-config
```

```bash [pnpm]
pnpm add @config-ui/ant-design-vue-config
```

```bash [yarn]
yarn add @config-ui/ant-design-vue-config
```

:::

### 使用

1. 在入口文件`main.ts`导入样式文件

```typescript
import '@config-ui/ant-design-vue-config/dist/es/style.css'
```

2. 按需引入业务组件

```vue
开发中，敬请期待～～～
```

## Shared

config-ui 业务组件库内部的一些通用工具函数、TS工具类型等

### 安装

::: code-group

```bash [npm]
npm i @config-ui/shared
```

```bash [pnpm]
pnpm add @config-ui/shared
```

```bash [yarn]
yarn add @config-ui/shared
```

:::

### 使用

```vue
<script setup>
import { useVisible } from '@config-ui/shared'

const { visible, show, hide } = useVisible()
</script>
```
