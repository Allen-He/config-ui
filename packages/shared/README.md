# @config-ui/shared

`@config-ui/shared` 是一个共享库，包含在 `config-ui` 项目中多个包之间复用的工具函数、组件和常量。

## 安装

使用 npm 或 yarn 安装：

```bash
npm install @config-ui/shared
# 或者
yarn add @config-ui/shared
```

## 功能

- **工具函数**: 提供常用的工具函数以减少重复代码。
- **共享组件**: 可复用的 React 组件。
- **常量**: 项目中通用的配置和常量。

## 使用方法

在项目中引入并使用：

```vue
<script setup>
import { useVisible } from '@config-ui/shared'

const { visible, show, hide } = useVisible()
</script>
```

## 文档

更多详细文档请参考 [官方文档](https://github.com/your-repo/config-ui)。
