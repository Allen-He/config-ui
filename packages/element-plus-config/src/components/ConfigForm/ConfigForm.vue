<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import { COMPONENT_MAP, useConfigWatch } from './helper'
import type { ConfigFormConfig, FormItemRawConfig } from './helper'
import type { FormInstance, FormProps, RowProps } from 'element-plus'
import type { UnionKey } from '@/shared/src'

const { formConfig, formRawConfig, rowConfig } = defineProps<{
  formConfig: ConfigFormConfig[]
  formRawConfig?: Partial<Exclude<FormProps, 'model'>>
  rowConfig?: Partial<RowProps>
}>()
const formModel = defineModel<Record<string, any>>({ required: true })

const formRef = useTemplateRef<FormInstance>('formRef')

useConfigWatch(formModel, formConfig)

const isVisible = (configItem: FormItemRawConfig) => {
  return configItem.isVisible ? configItem.isVisible(formModel.value) : true
}

const getField = (configItem: FormItemRawConfig, defaultValue?: unknown) => {
  return configItem.field ?? configItem.formItemProps?.prop ?? defaultValue
}

defineExpose({
  formRef,
})
</script>

<template>
  <el-form ref="formRef" :model="formModel" v-bind="formRawConfig">
    <el-row v-bind="rowConfig">
      <template v-for="(item, itemIndex) in formConfig" :key="getField(item, itemIndex)">
        <el-col v-if="isVisible(item)" v-bind="item.colProps">
          <el-form-item v-bind="item.formItemProps">
            <template v-if="!item.formItemSlots?.default">
              <component
                v-if="getField(item)"
                v-model="formModel[getField(item) as UnionKey]"
                :is="typeof item.component === 'string' ? COMPONENT_MAP[item.component] : item.component"
                v-bind="item.componentProps"
              >
                <template v-for="(_, slotName) in item.componentSlots" #[slotName]="slotProps" :key="slotName">
                  <slot :name="slotName" v-bind="slotProps"></slot>
                </template>
              </component>
              <component
                v-else
                :is="typeof item.component === 'string' ? COMPONENT_MAP[item.component] : item.component"
                v-bind="item.componentProps"
              >
                <template v-for="(_, slotName) in item.componentSlots" #[slotName]="slotProps" :key="slotName">
                  <slot :name="slotName" v-bind="slotProps"></slot>
                </template>
              </component>
            </template>
            <template
              v-for="(_, formItemSlotName) in item.formItemSlots"
              #[formItemSlotName]="formItemSlotProps"
              :key="formItemSlotName"
            >
              <slot :name="formItemSlotName" v-bind="formItemSlotProps"></slot>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>
