<script lang="ts" setup generic="T = any">
import { useTemplateRef } from 'vue'
import { COMPONENT_MAP } from './helper'
import type { ConfigFormConfig, FormItemRawConfig, ValueOrFn } from './helper'
import type { FormInstance, FormProps, RowProps } from 'element-plus'
import type { UnionKey } from '@config-ui/shared'

const { formConfig, formRawConfig, rowConfig } = defineProps<{
  formConfig: ConfigFormConfig<T>[]
  formRawConfig?: Partial<Exclude<FormProps, 'model'>>
  rowConfig?: Partial<RowProps>
}>()
const formModel = defineModel<Record<string, unknown>>({ required: true })

const formRef = useTemplateRef<FormInstance>('formRef')

const isVisible = (configItem: FormItemRawConfig<T>) => {
  return configItem.isVisible ? configItem.isVisible(formModel.value as T) : true
}

const getProps = (curProps: ValueOrFn) => {
  return typeof curProps === 'function' ? curProps() : curProps
}

const getField = (configItem: FormItemRawConfig<T>, defaultValue?: unknown) => {
  return configItem.field ?? getProps(configItem.formItemProps)?.prop ?? defaultValue
}

defineExpose({
  formRef,
})
</script>

<template>
  <el-form ref="formRef" :model="formModel" v-bind="formRawConfig">
    <el-row v-bind="rowConfig">
      <template v-for="(item, itemIndex) in formConfig" :key="getField(item, itemIndex)">
        <el-col v-show="isVisible(item)" v-bind="getProps(item.colProps)">
          <el-form-item v-bind="getProps(item.formItemProps)">
            <template v-if="!item.formItemSlots?.default">
              <component
                v-if="getField(item)"
                v-model="formModel[getField(item) as UnionKey<T>]"
                :is="typeof item.component === 'string' ? COMPONENT_MAP[item.component] : item.component"
                v-bind="getProps(item.componentProps)"
              >
                <template v-for="(_, slotName) in item.componentSlots" #[slotName]="slotProps" :key="slotName">
                  <slot :name="slotName" v-bind="slotProps"></slot>
                </template>
              </component>
              <component
                v-else
                :is="typeof item.component === 'string' ? COMPONENT_MAP[item.component] : item.component"
                v-bind="getProps(item.componentProps)"
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
