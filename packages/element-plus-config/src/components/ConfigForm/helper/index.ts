import { FormatEmits } from '@config-ui/shared'
import {
  ElRow,
  ElCol,
  ElInput,
  ElSelect,
  ElSelectV2,
  ElCascader,
  ElAutocomplete,
  ElFormItem,
  ElSwitch,
  ElSegmented,
} from 'element-plus'
import { ValueOf } from 'element-plus/es/components/table/src/table-column/defaults.mjs'
import { Component, Slot, Slots } from 'vue'
import type { ComponentProps, ComponentEmit, ComponentSlots } from 'vue-component-type-helpers'

export interface FormItemRawConfig<T = any> {
  formItemProps: Exclude<ComponentProps<typeof ElFormItem>, 'prop'> & { prop: keyof T & string }
  formItemSlots?: ComponentSlots<typeof ElFormItem>
  colProps?: ComponentProps<typeof ElCol>
}

export interface ComponentRawConfigMap<T = any> {
  // row: {
  //   component: 'row'
  //   componentProps?: ComponentProps<typeof ElRow>
  //   componentSlots?: ComponentSlots<typeof ElRow>
  //   children?: ValueOf<Exclude<ComponentRawConfigMap<T>, 'row'>>[]
  // }
  // col: {
  //   component: 'col'
  //   componentProps?: ComponentProps<typeof ElCol>
  //   componentSlots?: ComponentSlots<typeof ElCol>
  //   children?: ValueOf<Exclude<ComponentRawConfigMap<T>, 'row' | 'col'>>[]
  // }
  input: {
    component: 'input'
    componentProps?: ComponentProps<typeof ElInput> & FormatEmits<ComponentEmit<typeof ElInput>>
    componentSlots?: ComponentSlots<typeof ElInput>
  } & FormItemRawConfig<T>
  select: {
    component: 'select'
    componentProps?: ComponentProps<typeof ElSelect> & FormatEmits<ComponentEmit<typeof ElSelect>>
    componentSlots?: ComponentSlots<typeof ElSelect>
  } & FormItemRawConfig<T>
  'select-v2': {
    component: 'select-v2'
    componentProps?: ComponentProps<typeof ElSelectV2> &
      FormatEmits<ComponentEmit<typeof ElSelectV2>>
    componentSlots?: ComponentSlots<typeof ElSelectV2>
  } & FormItemRawConfig<T>
  cascader: {
    component: 'cascader'
    componentProps?: ComponentProps<typeof ElCascader> &
      FormatEmits<ComponentEmit<typeof ElCascader>>
    componentSlots?: ComponentSlots<typeof ElCascader>
  } & FormItemRawConfig<T>
  autocomplete: {
    component: 'autocomplete'
    componentProps?: ComponentProps<typeof ElAutocomplete> &
      FormatEmits<ComponentEmit<typeof ElAutocomplete>>
    componentSlots?: ComponentSlots<typeof ElAutocomplete>
  } & FormItemRawConfig<T>
  switch: {
    component: 'switch'
    componentProps?: ComponentProps<typeof ElSwitch> & FormatEmits<ComponentEmit<typeof ElSwitch>>
    componentSlots?: ComponentSlots<typeof ElSwitch>
  } & FormItemRawConfig<T>
  segmented: {
    component: 'segmented'
    componentProps?: ComponentProps<typeof ElSegmented> &
      FormatEmits<ComponentEmit<typeof ElSegmented>>
    componentSlots?: ComponentSlots<typeof ElSegmented>
  } & FormItemRawConfig<T>
}
export type CustomComponentRawConfig<T = any> = {
  component: Component
  componentProps?: any
  componentSlots?: Slots
} & FormItemRawConfig<T>

export type ConfigFormConfig<T = any> = (
  | ValueOf<ComponentRawConfigMap<T>>
  | CustomComponentRawConfig<T>
)[]

export const COMPONENT_MAP: Record<keyof ComponentRawConfigMap, Component> = {
  // row: ElRow,
  // col: ElCol,
  input: ElInput,
  select: ElSelect,
  'select-v2': ElSelectV2,
  cascader: ElCascader,
  autocomplete: ElAutocomplete,
  switch: ElSwitch,
  segmented: ElSegmented,
}
