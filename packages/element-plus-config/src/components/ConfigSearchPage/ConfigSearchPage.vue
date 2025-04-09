<script lang="ts" setup generic="F = any, T = any">
import { ElMessage } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'
import ConfigForm from '../ConfigForm/ConfigForm.vue'
import { SearchPageConfig, getDefaultFilterModel, getDefaultPaginationModel } from './helper/index'
import { omit } from 'lodash-es'
import { useVisible } from '@config-ui/shared'
import { ConfigFormConfig } from '../ConfigForm'

const {
  filterConfig = [],
  tableConfig,
  tableV2Config,
  paginationConfig = {},
  request,
} = defineProps<SearchPageConfig<F, T>>()

const filterModel = ref<F>(getDefaultFilterModel(filterConfig) as F)

const filterOutterRef = useTemplateRef('filterOutterRef')
const filterOutterConfig = computed(() =>
  filterConfig
    .filter((it) => !it.onlyInner)
    .map((it) => {
      const res = omit(it, ['default', 'onlyInner', 'onlyOutter'])

      return {
        ...res,
        colProps: {
          span: 6,
          ...res.colProps,
        },
      } as ConfigFormConfig
    }),
)
const filterInnerRef = useTemplateRef('filterInnerRef')
const filterInnerConfig = computed(() =>
  filterConfig
    .filter((it) => !it.onlyOutter)
    .map((it) => {
      const res = omit(it, ['default', 'onlyInner', 'onlyOutter'])

      return {
        ...res,
        colProps: {
          span: 24,
          ...res.colProps,
        },
      } as ConfigFormConfig
    }),
)

const { visible: drawerVisible, show: showDrawer, hide: hideDrawer } = useVisible()

const tableRef = useTemplateRef('tableRef')
const tableV2Ref = useTemplateRef('tableV2Ref')
const tableData = ref<T[]>([])

const paginationModel = ref(getDefaultPaginationModel(paginationConfig))

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
    ElMessage.error('Error fetching data:', error)
    tableData.value = []
    paginationModel.value.total = 0
  }
}
const resetHandle = () => {
  filterModel.value = getDefaultFilterModel(filterConfig)
  paginationModel.value = getDefaultPaginationModel(paginationConfig)
  searchHandle()
}

const drawerSearchHandle = async () => {
  try {
    await filterInnerRef.value?.formRef?.validate()
    searchHandle()
    hideDrawer()
  } catch (error) {
    console.log(error)

    ElMessage.error(Object.values(error)?.[0]?.[0].message)
  }
}
const drawerResetHandle = () => {
  filterModel.value = getDefaultFilterModel(filterConfig)
  searchHandle()
}

defineExpose({
  filterModel,
  filterOutterRef,
  filterInnerRef,
  tableRef,
  tableV2Ref,
  searchHandle,
  resetHandle,
})
</script>

<template>
  <div class="config-search-page">
    <div class="config-filter-wrap">
      <div class="config-filter-outter">
        <ConfigForm
          ref="filterOutterRef"
          class="config-filter-outter-form"
          v-model="filterModel"
          :form-config="filterOutterConfig"
          :form-raw-config="{
            labelPosition: 'top',
          }"
          :row-config="{ gutter: 15 }"
        />
        <div class="outter-btn-box">
          <el-button type="default" link @click="resetHandle">重置</el-button>
          <el-button type="primary" link @click="searchHandle">查询</el-button>
          <el-button type="primary" link @click="showDrawer">更多筛选</el-button>
        </div>
      </div>
      <div class="config-filter-controls">
        <slot name="controls"></slot>
      </div>

      <el-drawer v-model="drawerVisible" title="更多筛选">
        <ConfigForm
          ref="filterInnerRef"
          v-model="filterModel"
          :form-config="filterInnerConfig"
          :form-raw-config="{ labelPosition: 'top' }"
        />
        <div class="inner-btn-box">
          <el-button type="primary" link @click="drawerResetHandle">重置</el-button>
          <el-button type="primary" @click="drawerSearchHandle">查询</el-button>
        </div>
      </el-drawer>
    </div>
    <div class="config-table-wrap">
      <el-table v-if="tableConfig" ref="tableRef" :data="tableData" v-bind="tableConfig.tableProps">
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
      <el-table-v2 v-if="tableV2Config" ref="tableV2Ref" :data="tableData" v-bind="tableV2Config.tableProps">
        <template
          v-for="(_, tableV2SlotName) in tableV2Config.tableSlots"
          #[tableV2SlotName]="tableV2SlotSlotProps"
          :key="tableV2SlotName"
        >
          <slot :name="tableV2SlotName" v-bind="tableV2SlotSlotProps"></slot>
        </template>
      </el-table-v2>
    </div>
    <div class="config-pagination-wrap">
      <el-pagination
        v-model:current-page="paginationModel.current"
        v-model:page-size="paginationModel.pageSize"
        :total="paginationModel.total"
        v-bind="paginationConfig"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.config-search-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .config-filter-wrap {
    .config-filter-outter {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;

      .config-filter-outter-form {
        width: 100%;
      }
    }
    .config-filter-controls {
      width: 100%;
      padding: 10px 0;
    }
    :deep(.el-drawer) {
      .el-drawer__header {
        margin-bottom: 0;
      }
      .el-drawer__body {
        position: relative;
        .inner-btn-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
    }
  }

  .config-table-wrap {
    margin-bottom: 20px;
  }

  .config-pagination-wrap {
    margin-bottom: 20px;
  }
}
</style>
