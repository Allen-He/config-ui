# ConfigSearchPage

配置化的列表页面组件。集成页面标题、筛选表单、数据表格、分页等功能，支持抽屉式高级筛选，提供完整的类型提示。

## 代码示例

::: demo category="element-plus"
./demos/Demo1.vue
:::

## API

### Props

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| v-model:filter-model | 筛选表单数据对象 | `Record<string, unknown>` | 是 | - |
| page-header-config | 页头配置 | `PageHeaderConfig` | 否 | - |
| filter-config | 筛选表单配置 | `FilterConfig[]` | 否 | `[]` |
| table-config | 表格配置 | `TableConfig` | 否 | - |
| table-v2-config | 虚拟滚动表格配置 | `TableV2Config` | 否 | - |
| pagination-config | 分页器配置 | `PaginationConfig` | 否 | `{}` |
| request | 请求数据的函数 | `RequestFn` | 否 | - |
| requestImmediate | 是否立即发送请求 | `boolean` | 否 | `true` |

### 配置类型说明

#### PageHeaderConfig

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| pageHeaderProps | ElPageHeader 原生属性 | `ComponentProps<ElPageHeader> & FormatEmits<ComponentEmit<ElPageHeader>>` | 否 | - |
| pageHeaderSlots | ElPageHeader 插槽内容 | `ComponentSlots<ElPageHeader>` | 否 | - |

#### FilterConfig

继承 ConfigForm 的 [FormItemConfig](/element-plus-config/ConfigForm.html#FormItemConfig)，并扩展以下属性：

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| onlyInList | 是否仅在列表中显示 | `boolean` | 否 | - |
| onlyInDrawer | 是否仅在抽屉中显示 | `boolean` | 否 | - |

#### TableConfig

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| tableProps | ElTable 原生属性 | `Exclude<ComponentProps<ElTable>, 'data'> & FormatEmits<ComponentEmit<ElTable>>` | 否 | - |
| tableSlots | ElTable 插槽内容 | `ComponentSlots<ElTable>` | 否 | - |
| tableColumnsConfig | 表格列配置 | `TableColumnConfig[]` | 否 | - |

#### TableColumnConfig

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| columnProps | ElTableColumn 原生属性 | `Exclude<ComponentProps<ElTableColumn>, 'prop'> & { prop: UnionKey<T> }` | 否 | - |
| columnSlots | ElTableColumn 插槽内容 | `ComponentSlots<ElTableColumn>` | 否 | - |

#### TableV2Config

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| tableProps | ElTableV2 原生属性 | `Exclude<ComponentProps<ElTableV2>, 'data'> & FormatEmits<ComponentEmit<ElTableV2>>` | 否 | - |
| tableSlots | ElTableV2 插槽内容 | `ComponentSlots<ElTableV2>` | 否 | - |

#### PaginationConfig

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| paginationProps | ElPagination 原生属性 | `ComponentProps<ElPagination> & FormatEmits<ComponentEmit<ElPagination>>` | 否 | - |
| paginationSlots | ElPagination 插槽内容 | `ComponentSlots<ElPagination>` | 否 | - |

#### RequestFn

```ts
type RequestFn<F = any, T = any> = (
  params: F & { offset: number; limit: number }
) => Promise<{ data: T[]; total: number }>
```

### Exposed

| 名称 | 说明 | 类型 |
|------|------|------|
| listFilterRef | 列表筛选表单实例 | `Ref<FormInstance>` |
| drawerFilterRef | 抽屉筛选表单实例 | `Ref<FormInstance>` |
| tableRef | 表格实例 | `Ref<TableInstance>` |
| tableV2Ref | 虚拟滚动表格实例 | `Ref<TableV2Instance>` |
| searchHandle | 搜索方法 | `() => Promise<void>` |
| resetHandle | 重置方法 | `() => void` |

### Slots

| 名称 | 说明 |
|------|------|
| controls | 筛选区域的控制按钮 |
| pagination-controls | 分页区域的控制按钮 |
