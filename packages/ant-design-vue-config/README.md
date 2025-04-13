# @config-ui/ant-design-vue-config

`@config-ui/ant-design-vue-config` 是基于 [Ant Design Vue](https://antdv.com/) 的一组配置化组件，旨在提升开发效率，简化常见的 UI 需求。

## 已有组件

### 1. ConfigSearchPage

- **功能**: 提供一个集成了筛选表单、表格和分页的页面组件。
- **特点**:
  - 支持筛选条件的动态配置。
  - 内置分页和数据请求逻辑。
  - 支持更多筛选项的抽屉模式。

### 2. ConfigForm

- **功能**: 动态生成表单组件。
- **特点**:
  - 支持多种表单控件类型。
  - 提供灵活的布局和校验规则配置。

## 安装

```bash
npm install @config-ui/ant-design-vue-config
```

## 使用示例

```vue
<template>
  <ConfigSearchPage
    :filter-config="filterConfig"
    :table-config="tableConfig"
    :pagination-config="paginationConfig"
    :request="fetchData"
  />
</template>

<script setup>
import { ref } from 'vue'
import ConfigSearchPage from '@config-ui/ant-design-vue-config'

const filterConfig = [
  { label: '名称', prop: 'name', component: 'a-input' },
  {
    label: '状态',
    prop: 'status',
    component: 'a-select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
  },
]

const tableConfig = {
  tableProps: { bordered: true },
  tableColumnsConfig: [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '状态', dataIndex: 'status', key: 'status' },
  ],
}

const paginationConfig = {
  paginationProps: { pageSizeOptions: ['10', '20', '50'] },
}

const fetchData = async (params) => {
  // 模拟请求数据
  return { data: [], total: 0 }
}
</script>
```

## 文档

更多详细文档请参考 [官方文档](https://allen-he.github.io/config-ui)。
