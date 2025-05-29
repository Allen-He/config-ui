<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { ConfigSearchPage } from '@config-ui/element-plus-config'
import type {
  FilterConfig,
  TableConfig,
  PaginationConfig,
  RequestFn,
  PageHeaderConfig,
} from '@config-ui/element-plus-config'

interface FilterModel {
  name?: string
  category?: string
  count?: string
  region?: string
  delivery?: boolean
  location?: string
  desc?: string
}
interface TabledDataItem {
  name: string
  category: string
  count: string
  region: string
  desc: string
  remark: string
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: String(idx + 1),
  label: String(idx + 1),
}))

const filterModel = ref<FilterModel>({
  name: undefined,
  category: undefined,
  region: undefined,
  count: undefined,
  delivery: false,
  desc: undefined,
})

const configSearchPageRef = useTemplateRef('configSearchPageRef')

const pageHeaderConfig = ref<PageHeaderConfig>({
  pageHeaderProps: {
    content: '列表页标题',
  },
})
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
    field: 'category',
    formItemProps: {
      label: 'Activity category',
      prop: 'category',
    },
    component: 'ElInput',
    componentProps: {
      placeholder: 'Activity category',
    },
    isVisible: (model) => !!model.name,
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
    componentProps: () => {
      return {
        disabled: !filterModel.value.region,
        placeholder: 'Activity count',
        options: options,
        onChange: (val: string) => {
          console.log('Activity count', val)
        },
      }
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
    onlyInDrawer: true,
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
        minWidth: 130,
        fixed: 'left',
      },
    },
    {
      columnProps: {
        label: 'Activity count',
        prop: 'count',
        minWidth: 150,
      },
    },
    {
      columnProps: {
        label: 'Activity zone',
        prop: 'region',
        minWidth: 200,
      },
    },
    {
      columnProps: {
        label: 'Activity desc',
        prop: 'desc',
        minWidth: 300,
      },
    },
    {
      columnProps: {
        label: 'Activity remark',
        prop: 'remark',
        minWidth: 300,
      },
    },
  ],
})
const paginationConfig = ref<PaginationConfig>({
  paginationProps: {
    pageSizes: [10, 20, 30, 40],
    pageSize: 20,
  },
})

const request: RequestFn<FilterModel, TabledDataItem> = async (params) => {
  console.log('configSearchPageRef', configSearchPageRef.value)
  console.log('request params', params)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 100,
        data: Array.from({ length: 20 }).map(
          (_, idx) =>
            ({
              name: `Activity ${idx + 1}`,
              category: `Category ${idx + 1}`,
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
    style="height: 500px"
    ref="configSearchPageRef"
    v-model:filter-model="filterModel"
    :page-header-config="pageHeaderConfig"
    :filter-config="filterConfig"
    :table-config="tableConfig"
    :pagination-config="paginationConfig"
    :request="request"
    :request-immediate="false"
  />
</template>

<style scoped>
.btn-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
