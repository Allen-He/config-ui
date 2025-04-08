<script lang="ts" setup>
import { ref } from 'vue'
import { COMPONENT_MAP } from './helper'
import type { ConfigFormConfig } from './helper'
import type { FormInstance, FormProps, RowProps } from 'element-plus'

const { formConfig, formRawConfig, rowConfig } = defineProps<{
  formConfig: ConfigFormConfig[]
  formRawConfig?: Partial<Exclude<FormProps, 'model'>>
  rowConfig?: Partial<RowProps>
}>()
const formModel = defineModel<Record<string, any>>({ required: true })

const formRef = ref<FormInstance>()

defineExpose({
  formRef,
})
</script>

<template>
  <el-form ref="formRef" :model="formModel" v-bind="formRawConfig">
    <el-row v-bind="rowConfig">
      <template v-for="item in formConfig" :key="item.field ?? item.formItemProps!.prop">
        <el-col v-bind="item.colProps">
          <el-form-item v-bind="item.formItemProps">
            <component
              v-if="!item.formItemSlots?.default"
              v-model="formModel[item.field ?? item.formItemProps!.prop]"
              :is="
                typeof item.component === 'string' ? COMPONENT_MAP[item.component] : item.component
              "
              v-bind="item.componentProps"
            >
              <template
                v-for="(_, slotName) in item.componentSlots"
                #[slotName]="slotProps"
                :key="slotName"
              >
                <slot :name="slotName" v-bind="slotProps"></slot>
              </template>
            </component>
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
