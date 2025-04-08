import { ComponentEmit, ComponentProps, ComponentSlots } from 'vue-component-type-helpers'
import { ConfigFormConfig } from '../../ConfigForm'
import { FormatEmits, UnionKey } from '@config-ui/shared'
import { ElPagination, ElTable, ElTableColumn, ElTableV2 } from 'element-plus'

export type FilterConfig<T = any> = ConfigFormConfig<T> & {
  default?: unknown | (() => unknown)
  onlyOutter?: boolean
  onlyInner?: boolean
}

export type TableColumnConfig<T = any> = {
  columnProps?: Exclude<ComponentProps<typeof ElTableColumn>, 'prop'> & {
    prop: UnionKey<T>
  } & FormatEmits<ComponentEmit<typeof ElTableColumn>>
  columnSlots?: ComponentSlots<typeof ElTableColumn>
}

export type TablePaginationConfig = {
  paginationProps?: ComponentProps<typeof ElPagination> & FormatEmits<ComponentEmit<typeof ElPagination>>
  paginationSlots?: ComponentSlots<typeof ElPagination>
}

export type TableConfig<T = any> = {
  tableProps?: Exclude<ComponentProps<typeof ElTable>, 'data'> & FormatEmits<ComponentEmit<typeof ElTable>>
  tableSlots?: ComponentSlots<typeof ElTable>
  tableColumnsConfig?: TableColumnConfig<T>[]
  tablePaginationConfig?: TablePaginationConfig
}

export type TableV2Config = {
  tableProps?: Exclude<ComponentProps<typeof ElTableV2>, 'data'> & FormatEmits<ComponentEmit<typeof ElTableV2>>
  tableSlots?: ComponentSlots<typeof ElTableV2>
  tablePaginationConfig?: TablePaginationConfig
}

export type RequestFn<F = any, T = any> = (
  params: F & { offset: number; limit: number },
) => Promise<{ data: T[]; total: number }>

export type SearchPageConfig<F = any, T = any> = {
  filterConfig?: FilterConfig<F>[]
  tableConfig?: TableConfig<T>
  tableV2Config?: TableV2Config
  request?: RequestFn<F, T>
}

export const getDefaultFilterModel = (filterConfig: FilterConfig[]) => {
  const filterModel: Record<string, unknown> = {}

  return filterConfig.reduce((acc, cur) => {
    const { default: defaultValue, field, formItemProps } = cur
    acc[field ?? formItemProps!.prop] = typeof defaultValue === 'function' ? defaultValue() : defaultValue
    return acc
  }, filterModel)
}

export const getDefaultPaginationModel = (paginationConfig: TablePaginationConfig) => {
  const { paginationProps } = paginationConfig

  return {
    current: paginationProps?.currentPage ?? 1,
    pageSize: paginationProps?.pageSize ?? 10,
    total: paginationProps?.pageCount ?? 0,
  }
}
