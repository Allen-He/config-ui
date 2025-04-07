<script lang="ts" setup>
import { FormInstance, TableInstance } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'
import ConfigForm from '../ConfigForm/ConfigForm.vue'
import { SearchPageConfig, getDefaultFilterModel, getDefaultPaginationModel } from './helper/index'
import { omit } from 'lodash-es'
import { ConfigFormConfig } from '../ConfigForm'
import { useVisible } from '@config-ui/shared'

const { filterConfig = [], tableConfig = {}, request } = defineProps<SearchPageConfig>()

const filterModel = ref(getDefaultFilterModel(filterConfig))

const filterOutterRef = useTemplateRef<FormInstance>('filterOutterRef')
const filterOutterConfig = computed(() =>
  filterConfig
    .filter((it) => !it.onlyInner)
    .map<
      ConfigFormConfig[number]
    >((it) => omit(it, ['field', 'default', 'onlyInner', 'onlyOutter'])),
)
const filterInnerRef = useTemplateRef<FormInstance>('filterInnerRef')
const filterInnerConfig = computed(() =>
  filterConfig
    .filter((it) => !it.onlyOutter)
    .map<
      ConfigFormConfig[number]
    >((it) => omit(it, ['field', 'default', 'onlyInner', 'onlyOutter'])),
)

const { visible: drawerVisible, show: showDrawer } = useVisible()

const tableRef = useTemplateRef<TableInstance>('tableRef')
const tableData = ref<unknown[]>([])

const paginationModel = ref(getDefaultPaginationModel(tableConfig.tablePaginationConfig ?? {}))

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  searchHandle()
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  searchHandle()
}

const searchHandle = async () => {
  const resFormData = filterModel.value

  if (!request) {
    tableData.value = []
    paginationModel.value.total = 0
    return
  }

  try {
    const resData = await request({
      ...resFormData,
      offset: (paginationModel.value.current - 1) * paginationModel.value.pageSize,
      limit: paginationModel.value.pageSize,
    })
    tableData.value = resData.data ?? []
    paginationModel.value.total = resData.total ?? 0
  } catch (error) {
    console.error('Error fetching data:', error)
    tableData.value = []
    paginationModel.value.total = 0
  }
}

const resetHandle = () => {
  filterModel.value = getDefaultFilterModel(filterConfig)
  paginationModel.value = getDefaultPaginationModel(tableConfig.tablePaginationConfig ?? {})
  searchHandle()
}

defineExpose({
  filterModel,
  filterOutterRef,
  filterInnerRef,
  tableRef,
  searchHandle,
  resetHandle,
})
</script>

<template>
  <div class="config-search-page">
    <div class="config-filter-wrap">
      <div class="config-filter-outter-wrap">
        <ConfigForm ref="filterOutterRef" v-model="filterModel" :form-config="filterOutterConfig" />
        <div class="outter-btn-box">
          <el-button type="default" @click="resetHandle">重置</el-button>
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button type="primary" @click="showDrawer">更多筛选</el-button>
        </div>
      </div>

      <el-drawer v-model="drawerVisible" title="更多筛选">
        <ConfigForm ref="filterInnerRef" v-model="filterModel" :form-config="filterInnerConfig" />
        <div class="inner-btn-box">
          <el-button type="default" @click="resetHandle">重置</el-button>
          <el-button type="primary" @click="searchHandle">查询</el-button>
        </div>
      </el-drawer>
    </div>
    <div class="config-table-wrap">
      <el-table ref="tableRef" :data="tableData" v-bind="tableConfig.tableProps">
        <template v-if="!tableConfig.tableSlots?.default">
          <el-table-column
            v-for="(item, index) in tableConfig.tableColumnsConfig"
            :key="index"
            v-bind="item.columnProps"
          >
            <template
              v-for="(_, columnSlotName) in tableConfig.tableSlots"
              #[columnSlotName]="columnSlotProps"
              :key="columnSlotName"
            >
              <slot :name="columnSlotName" v-bind="columnSlotProps"></slot>
            </template>
          </el-table-column>
        </template>
        <template
          v-for="(_, tableSlotName) in tableConfig.tableSlots"
          #[tableSlotName]="tableSlotSlotProps"
          :key="tableSlotName"
        >
          <slot :name="tableSlotName" v-bind="tableSlotSlotProps"></slot>
        </template>
      </el-table>
    </div>
    <div class="config-pagination-wrap">
      <el-pagination
        v-model:current-page="paginationModel.current"
        v-model:page-size="paginationModel.pageSize"
        :total="paginationModel.total"
        v-bind="tableConfig.tablePaginationConfig"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
