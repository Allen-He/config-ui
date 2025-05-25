import type { ComponentEmit, ComponentProps, ComponentSlots } from 'vue-component-type-helpers'
import type { ConfigFormConfig } from '../../ConfigForm'
import type { FormatEmits, UnionKey } from '@config-ui/shared'
import { ElPageHeader, ElPagination, ElTable, ElTableColumn, ElTableV2 } from 'element-plus'

export type PageHeaderConfig = {
  pageHeaderProps?: ComponentProps<typeof ElPageHeader> & FormatEmits<ComponentEmit<typeof ElPageHeader>>
  pageHeaderSlots?: ComponentSlots<typeof ElPageHeader>
}

export type FilterConfig<T = any> = ConfigFormConfig<T> & {
  onlyInList?: boolean
  onlyInDrawer?: boolean
}

export type TableColumnConfig<T = any> = {
  columnProps?: Exclude<ComponentProps<typeof ElTableColumn>, 'prop'> & {
    prop: UnionKey<T>
  } & FormatEmits<ComponentEmit<typeof ElTableColumn>>
  columnSlots?: ComponentSlots<typeof ElTableColumn>
}

export type TableConfig<T = any> = {
  tableProps?: Exclude<ComponentProps<typeof ElTable>, 'data'> & FormatEmits<ComponentEmit<typeof ElTable>>
  tableSlots?: ComponentSlots<typeof ElTable>
  tableColumnsConfig?: TableColumnConfig<T>[]
}

export type TableV2Config = {
  tableProps: Exclude<ComponentProps<typeof ElTableV2>, 'data'> & FormatEmits<ComponentEmit<typeof ElTableV2>>
  tableSlots?: ComponentSlots<typeof ElTableV2>
}

export type PaginationConfig = {
  paginationProps?: ComponentProps<typeof ElPagination> & FormatEmits<ComponentEmit<typeof ElPagination>>
  paginationSlots?: ComponentSlots<typeof ElPagination>
}

export type RequestFn<F = any, T = any> = (
  params: F & { offset: number; limit: number },
) => Promise<{ data: T[]; total: number }>

export type SearchPageConfig<F = any, T = any> = {
  pageHeaderConfig?: PageHeaderConfig
  filterConfig?: FilterConfig<F>[]
  tableConfig?: TableConfig<T>
  tableV2Config?: TableV2Config
  paginationConfig?: PaginationConfig
  request?: RequestFn<F, T>
}
