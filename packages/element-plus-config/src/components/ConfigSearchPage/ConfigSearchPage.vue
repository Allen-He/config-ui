<script lang="tsx" setup generic="F = any, T = any">
import { ElMessage } from 'element-plus'
import { computed, defineComponent, ref, useTemplateRef } from 'vue'
import ConfigForm from '../ConfigForm/ConfigForm.vue'
import type { SearchPageConfig } from './helper/index'
import { cloneDeep, omit } from 'lodash-es'
import { useVisible } from '@config-ui/shared'
import type { ConfigFormConfig } from '../ConfigForm'

const {
  pageHeaderConfig,
  filterConfig = [],
  tableConfig,
  tableV2Config,
  paginationConfig = {},
  request,
} = defineProps<SearchPageConfig<F, T>>()

const FilterSearchComp = defineComponent({
  setup() {
    return () => (
      <div class="list-btn-box">
        <el-divider direction="vertical" style="margin-left: 0px"></el-divider>
        <el-button type="primary" link onClick={resetHandle}>
          重置
        </el-button>
        <el-button type="primary" link onClick={searchHandle}>
          查询
        </el-button>
        <el-button type="primary" link onClick={drawerOpenHandle}>
          更多筛选项
        </el-button>
      </div>
    )
  },
})
const getDefaultPaginationModel = () => {
  const { currentPage = 1, pageSize = 10, total = 0 } = paginationConfig.paginationProps ?? {}
  return { currentPage, pageSize, total }
}

const listFilterModel = defineModel<Record<string, unknown>>('filterModel', { required: true })
const listFilterRef = useTemplateRef('listFilterRef')
const listFilterConfig = computed(() =>
  filterConfig
    .concat([{ component: FilterSearchComp, formItemProps: { style: 'height: calc(100% - 18px)' } }])
    .map((it) => {
      const res = omit(it, ['onlyInDrawer', 'onlyInList'])

      return {
        ...res,
        colProps: {
          span: 8,
          ...res.colProps,
        },
        isVisible: (model) => {
          return it.isVisible ? it.isVisible(model) && !it.onlyInDrawer : !it.onlyInDrawer
        },
      } as ConfigFormConfig
    }),
)

const tableRef = useTemplateRef('tableRef')
const tableV2Ref = useTemplateRef('tableV2Ref')
const tableData = ref<T[]>([])

const paginationModel = ref(getDefaultPaginationModel())

const searchHandle = async () => {
  const resFormData = listFilterModel.value as F

  if (!request) {
    tableData.value = []
    paginationModel.value.total = 0
    return
  }

  try {
    const resData = await request({
      ...resFormData,
      offset: (paginationModel.value.currentPage - 1) * paginationModel.value.pageSize,
      limit: paginationModel.value.pageSize,
    })
    tableData.value = resData.data ?? []
    paginationModel.value.total = resData.total ?? 0
  } catch (error: any) {
    ElMessage.error('Error fetching data:', error.message)
    tableData.value = []
    paginationModel.value.total = 0
  }
}
const resetHandle = () => {
  listFilterRef.value?.formRef?.resetFields()
  paginationModel.value = getDefaultPaginationModel()
  searchHandle()
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  searchHandle()
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  searchHandle()
}

const { visible: drawerVisible, show: showDrawer, hide: hideDrawer } = useVisible()

const drawerFilterModel = ref(cloneDeep(listFilterModel.value))
const drawerFilterRef = useTemplateRef('drawerFilterRef')
const drawerFilterConfig = computed(() =>
  filterConfig.map((it) => {
    const res = omit(it, ['onlyInDrawer', 'onlyInList'])

    return {
      ...res,
      colProps: {
        span: 24,
        ...res.colProps,
      },
      isVisible: (model) => {
        return it.isVisible ? it.isVisible(model) && !it.onlyInList : !it.onlyInList
      },
    } as ConfigFormConfig
  }),
)

const drawerOpenHandle = () => {
  drawerFilterModel.value = cloneDeep(listFilterModel.value)
  showDrawer()
}
const drawerSearchHandle = async () => {
  try {
    await drawerFilterRef.value?.formRef?.validate()
    listFilterModel.value = cloneDeep(drawerFilterModel.value)
    searchHandle()
    hideDrawer()
  } catch (error: any) {
    console.log(error)
    ElMessage.error((Object.values(error) as any)?.[0]?.[0]?.message)
  }
}
const drawerResetHandle = () => {
  drawerFilterModel.value = cloneDeep(listFilterModel.value)
}

defineExpose({
  listFilterRef,
  drawerFilterRef,
  tableRef,
  tableV2Ref,
  searchHandle,
  resetHandle,
})
</script>

<template>
  <div class="config-search-page">
    <div class="config-header-wrap" v-if="pageHeaderConfig">
      <el-page-header v-bind="pageHeaderConfig.pageHeaderProps">
        <template
          v-for="(_, pageHeaderSlotName) in pageHeaderConfig.pageHeaderSlots"
          #[pageHeaderSlotName]="pageHeaderSlotProps"
          :key="pageHeaderSlotName"
        >
          <slot :name="pageHeaderSlotName" v-bind="pageHeaderSlotProps"></slot>
        </template>
      </el-page-header>
    </div>
    <div class="config-filter-wrap">
      <div class="config-filter-list">
        <config-form
          ref="listFilterRef"
          class="config-filter-list-form"
          v-model="listFilterModel"
          :form-config="listFilterConfig"
          :form-raw-config="{ labelWidth: 'auto' }"
          :row-config="{ gutter: 15 }"
        />
      </div>
      <div class="config-filter-controls">
        <slot name="controls"></slot>
      </div>

      <el-drawer v-model="drawerVisible" title="更多筛选项">
        <config-form
          ref="drawerFilterRef"
          v-model="drawerFilterModel"
          :form-config="drawerFilterConfig"
          :form-raw-config="{ labelPosition: 'top' }"
        />
        <div class="drawer-btn-box">
          <el-button type="primary" link @click="drawerResetHandle">重置</el-button>
          <el-button type="primary" @click="drawerSearchHandle">查询</el-button>
        </div>
      </el-drawer>
    </div>
    <div class="config-table-wrap">
      <el-table v-if="tableConfig" ref="tableRef" :data="tableData" height="100%" v-bind="tableConfig.tableProps">
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
      <el-table-v2 v-if="tableV2Config" ref="tableV2Ref" v-bind="tableV2Config.tableProps" :data="tableData">
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
      <div class="config-pagination-controls">
        <slot name="pagination-controls"></slot>
      </div>
      <el-pagination
        layout="total, prev, pager, next, jumper, sizes"
        v-bind="paginationConfig.paginationProps"
        v-model:current-page="paginationModel.currentPage"
        v-model:page-size="paginationModel.pageSize"
        :total="paginationModel.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <template
          v-for="(_, paginationSlotName) in paginationConfig.paginationSlots"
          #[paginationSlotName]="paginationSlotProps"
          :key="paginationSlotName"
        >
          <slot :name="paginationSlotName" v-bind="paginationSlotProps"></slot>
        </template>
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.config-search-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .config-header-wrap {
    margin-bottom: 20px;
    :deep(.el-page-header) {
      .el-page-header__back,
      .el-divider {
        display: none;
      }
    }
  }

  .config-filter-wrap {
    .config-filter-list {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;

      .config-filter-list-form {
        width: 100%;

        :deep(.list-btn-box) {
          display: flex;
          align-items: center;
        }
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
        .drawer-btn-box {
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
    flex: 1 1 auto;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .config-pagination-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .config-pagination-controls {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
}
</style>
