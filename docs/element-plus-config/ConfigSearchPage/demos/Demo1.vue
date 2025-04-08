<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import {
  ConfigSearchPage,
  FilterConfig,
  RequestFn,
  TableConfig,
} from '@config-ui/element-plus-config'

interface FilterModel {
  name: string
  count: string
  region: string
  delivery: boolean
  location: string
  desc: string
}
interface TabledDataItem {
  name: string
  count: string
  region: string
  desc: string
  remark: string
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: String(idx + 1),
  label: String(idx + 1),
}))

const configSearchPageRef = useTemplateRef('configSearchPageRef')

const filterConfig = ref<FilterConfig<FilterModel>[]>([
  {
    field: 'name',
    formItemProps: {
      label: 'Activity name',
      prop: 'name',
    },
    component: 'ElInput',
    componentProps: {
      placeholder: 'Activity name',
    },
  },
  {
    field: 'region',
    formItemProps: {
      label: 'Activity zone',
      prop: 'region',
    },
    component: 'ElSelectV2',
    componentProps: {
      placeholder: 'Activity zone',
      options: [
        { label: 'Zone one', value: 'shanghai' },
        { label: 'Zone two', value: 'beijing' },
      ],
      onChange: (val: string) => {
        console.log('Activity zone', val)
      },
    },
  },
  {
    field: 'count',
    formItemProps: {
      label: 'Activity count',
      prop: 'count',
    },
    component: 'ElSelectV2',
    componentProps: {
      placeholder: 'Activity count',
      options: options,
      onChange: (val: string) => {
        console.log('Activity count', val)
      },
    },
  },
  {
    field: 'desc',
    formItemProps: {
      label: 'Activity desc',
      prop: 'desc',
    },
    component: 'ElInput',
    componentProps: {
      placeholder: 'Activity desc',
    },
  },
])
const tableConfig = ref<TableConfig<TabledDataItem>>({
  tableProps: {
    border: true,
  },
  tableColumnsConfig: [
    {
      columnProps: {
        label: 'Activity name',
        prop: 'name',
        width: 130,
        fixed: 'left',
      },
    },
    {
      columnProps: {
        label: 'Activity count',
        prop: 'count',
        width: 150,
      },
    },
    {
      columnProps: {
        label: 'Activity zone',
        prop: 'region',
        width: 200,
      },
    },
    {
      columnProps: {
        label: 'Activity desc',
        prop: 'desc',
        width: 300,
      },
    },
    {
      columnProps: {
        label: 'Activity remark',
        prop: 'remark',
        width: 300,
      },
    },
  ],
  tablePaginationConfig: {
    paginationProps: {
      pageSizes: [10, 20, 30, 40],
    },
  },
})

const request: RequestFn<FilterModel, TabledDataItem> = async (params) => {
  console.log('configSearchPageRef', configSearchPageRef.value)
  console.log('request params', params)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 100,
        data: Array.from({ length: 10 }).map(
          (_, idx) =>
            ({
              name: `Activity ${idx + 1}`,
              count: String(idx + 1),
              region: 'shanghai',
              delivery: true,
              location: 'Home',
              desc: 'This is a test activity',
              remark: 'This is a test remark',
            }) as TabledDataItem,
        ),
      })
    }, 1000)
  })
}
</script>

<template>
  <ConfigSearchPage
    ref="configSearchPageRef"
    :filter-config="filterConfig"
    :table-config="tableConfig"
    :request="request"
  />
</template>

<style lang="scss" scoped>
.btn-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
