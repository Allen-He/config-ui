import { ComponentEmit, ComponentProps, ComponentSlots } from 'vue-component-type-helpers'
import { ConfigFormConfig } from '../../ConfigForm'
import { FormatEmits } from '@config-ui/shared'
import { ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { format } from 'path'

export type FilterConfig<T = any> = ConfigFormConfig<T> & {
  field: string
  default: unknown | (() => unknown)
  onlyOutter?: boolean
  onlyInner?: boolean
}

export type TableColumnConfig<T = any> = {
  columnProps?: Exclude<ComponentProps<typeof ElTableColumn>, 'prop'> & {
    prop: keyof T & string
  } & FormatEmits<ComponentEmit<typeof ElTableColumn>>
  columnSlots?: ComponentSlots<typeof ElTableColumn>
}

export type TablePaginationConfig = {
  paginationProps?: ComponentProps<typeof ElPagination> &
    FormatEmits<ComponentEmit<typeof ElPagination>>
  paginationSlots?: ComponentSlots<typeof ElPagination>
}

export type TableConfig<T = any> = {
  tableProps?: ComponentProps<typeof ElTable> & FormatEmits<ComponentEmit<typeof ElTable>>
  tableSlots?: ComponentSlots<typeof ElTable>
  tableColumnsConfig?: TableColumnConfig<T>[]
  tablePaginationConfig?: TablePaginationConfig
}

export type SearchPageConfig<F = any, T = any> = {
  filterConfig?: FilterConfig<F>[]
  tableConfig?: TableConfig<T>
  request?: (params: F & { offset: number; limit: number }) => Promise<{ data: T[]; total: number }>
}

export const getDefaultFilterModel = (filterConfig: FilterConfig[]) => {
  const filterModel: Record<string, unknown> = {}

  return filterConfig.reduce((acc, cur) => {
    const { field, default: defaultValue } = cur
    acc[field] = typeof defaultValue === 'function' ? defaultValue() : defaultValue
    return acc
  }, filterModel)
}

export const getDefaultPaginationModel = (paginationConfig: TablePaginationConfig) => {
  console.log('paginationConfig', paginationConfig)
  return {
    current: 1,
    pageSize: 10,
    total: 0,
  }
}
