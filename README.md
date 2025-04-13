# config-ui

`config-ui` 是一个基于 Vue 3 和 Vite 的配置化表单及列表页组件库，采用 **monorepo 架构**，同时兼容 **ant-design-vue** 和 **element-plus**。

## 特性

- **Vue 3**: 使用最新的 Vue 版本，支持 Composition API。
- **配置化组件**: 提供高度可配置的表单和列表页组件，减少重复开发。
- **TypeScript 支持**: 提供 `.vue` 文件的类型支持。
- **单元测试**: 集成 [Vitest](https://vitest.dev/)。
- **代码质量**: 使用 [ESLint](https://eslint.org/) 进行代码检查。
- **完善的文档**: 提供详细的使用指南和示例。

## 子仓库

- **@config-ui/shared**: 提供共享的工具函数、组件和常量，供其他子仓库复用。
- **@config-ui/ant-design-vue-config**: 包括配置化表单及列表页组件等。
- **@config-ui/element-plus-config**: 包括配置化表单及列表页组件等。
- **@config-ui/docs**: 项目文档和示例，帮助开发者快速上手。

## 快速开始

### 安装依赖

```sh
pnpm i
```

### 启动开发服务器

```sh
pnpm start
```

### 构建生产环境代码

```sh
pnpm build
```

### 运行单元测试

```sh
pnpm test:unit
```

### 代码检查

```sh
pnpm lint
```

### 代码格式化

```sh
pnpm format
```

## 配置

有关 Vite 的详细配置，请参考 [Vite Configuration Reference](https://vite.dev/config/)。

## 贡献

欢迎贡献代码！请提交 Issue 或 Pull Request。
