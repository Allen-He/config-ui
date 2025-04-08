import { FormatEmits, UnionKey } from '@config-ui/shared'
import {
  // ElRow,
  ElCol,
  ElInput,
  ElSelect,
  ElSelectV2,
  ElCascader,
  ElAutocomplete,
  ElFormItem,
  ElSwitch,
  ElSegmented,
  ElCheckbox,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInputNumber,
  ElInputTag,
  ElMention,
  ElRadio,
  ElRate,
  ElSlider,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElTreeSelect,
  ElUpload,
} from 'element-plus'
import { ValueOf } from 'element-plus/es/components/table/src/table-column/defaults.mjs'
import { Component, Slots } from 'vue'
import type { ComponentProps, ComponentEmit, ComponentSlots } from 'vue-component-type-helpers'

// note: "field"的优先级比"formItemProps.prop"高，且两者不能同时为空
export interface FormItemRawConfig<T = any> {
  field?: UnionKey<T>
  formItemProps?: Exclude<ComponentProps<typeof ElFormItem>, 'prop'> & { prop: UnionKey<T> }
  formItemSlots?: ComponentSlots<typeof ElFormItem>
  colProps?: ComponentProps<typeof ElCol>
}

export interface ComponentRawConfigMap<T = any> {
  // ElRow: {
  //   component: 'ElRow'
  //   componentProps?: ComponentProps<typeof ElRow>
  //   componentSlots?: ComponentSlots<typeof ElRow>
  //   children?: ValueOf<Exclude<ComponentRawConfigMap<T>, 'row'>>[]
  // }
  // ElCol: {
  //   component: 'ElCol'
  //   componentProps?: ComponentProps<typeof ElCol>
  //   componentSlots?: ComponentSlots<typeof ElCol>
  //   children?: ValueOf<Exclude<ComponentRawConfigMap<T>, 'row' | 'col'>>[]
  // }
  ElAutocomplete: {
    component: 'ElAutocomplete'
    componentProps?: ComponentProps<typeof ElAutocomplete> & FormatEmits<ComponentEmit<typeof ElAutocomplete>>
    componentSlots?: ComponentSlots<typeof ElAutocomplete>
  } & FormItemRawConfig<T>
  ElCascader: {
    component: 'ElCascader'
    componentProps?: ComponentProps<typeof ElCascader> & FormatEmits<ComponentEmit<typeof ElCascader>>
    componentSlots?: ComponentSlots<typeof ElCascader>
  } & FormItemRawConfig<T>
  ElCheckbox: {
    component: 'ElCheckbox'
    componentProps?: ComponentProps<typeof ElCheckbox> & FormatEmits<ComponentEmit<typeof ElCheckbox>>
    componentSlots?: ComponentSlots<typeof ElCheckbox>
  } & FormItemRawConfig<T>
  ElCheckboxGroup: {
    component: 'ElCheckboxGroup'
    componentProps?: ComponentProps<typeof ElCheckboxGroup> & FormatEmits<ComponentEmit<typeof ElCheckboxGroup>>
    componentSlots?: ComponentSlots<typeof ElCheckboxGroup>
  } & FormItemRawConfig<T>
  ElColorPicker: {
    component: 'ElColorPicker'
    componentProps?: ComponentProps<typeof ElColorPicker> & FormatEmits<ComponentEmit<typeof ElColorPicker>>
    componentSlots?: ComponentSlots<typeof ElColorPicker>
  } & FormItemRawConfig<T>
  ElDatePicker: {
    component: 'ElDatePicker'
    componentProps?: ComponentProps<typeof ElDatePicker> & FormatEmits<ComponentEmit<typeof ElDatePicker>>
    componentSlots?: ComponentSlots<typeof ElDatePicker>
  } & FormItemRawConfig<T>
  ElInput: {
    component: 'ElInput'
    componentProps?: ComponentProps<typeof ElInput> & FormatEmits<ComponentEmit<typeof ElInput>>
    componentSlots?: ComponentSlots<typeof ElInput>
  } & FormItemRawConfig<T>
  ElInputNumber: {
    component: 'ElInputNumber'
    componentProps?: ComponentProps<typeof ElInputNumber> & FormatEmits<ComponentEmit<typeof ElInputNumber>>
    componentSlots?: ComponentSlots<typeof ElInputNumber>
  } & FormItemRawConfig<T>
  ElInputTag: {
    component: 'ElInputTag'
    componentProps?: ComponentProps<typeof ElInputTag> & FormatEmits<ComponentEmit<typeof ElInputTag>>
    componentSlots?: ComponentSlots<typeof ElInputTag>
  } & FormItemRawConfig<T>
  ElMention: {
    component: 'ElMention'
    componentProps?: ComponentProps<typeof ElMention> & FormatEmits<ComponentEmit<typeof ElMention>>
    componentSlots?: ComponentSlots<typeof ElMention>
  } & FormItemRawConfig<T>
  ElRadio: {
    component: 'ElRadio'
    componentProps?: ComponentProps<typeof ElRadio> & FormatEmits<ComponentEmit<typeof ElRadio>>
    componentSlots?: ComponentSlots<typeof ElRadio>
  } & FormItemRawConfig<T>
  ElRate: {
    component: 'ElRate'
    componentProps?: ComponentProps<typeof ElRate> & FormatEmits<ComponentEmit<typeof ElRate>>
    componentSlots?: ComponentSlots<typeof ElRate>
  } & FormItemRawConfig<T>
  ElSelect: {
    component: 'ElSelect'
    componentProps?: ComponentProps<typeof ElSelect> & FormatEmits<ComponentEmit<typeof ElSelect>>
    componentSlots?: ComponentSlots<typeof ElSelect>
  } & FormItemRawConfig<T>
  ElSelectV2: {
    component: 'ElSelectV2'
    componentProps?: ComponentProps<typeof ElSelectV2> & FormatEmits<ComponentEmit<typeof ElSelectV2>>
    componentSlots?: ComponentSlots<typeof ElSelectV2>
  } & FormItemRawConfig<T>
  ElSlider: {
    component: 'ElSlider'
    componentProps?: ComponentProps<typeof ElSlider> & FormatEmits<ComponentEmit<typeof ElSlider>>
    componentSlots?: ComponentSlots<typeof ElSlider>
  } & FormItemRawConfig<T>
  ElSwitch: {
    component: 'ElSwitch'
    componentProps?: ComponentProps<typeof ElSwitch> & FormatEmits<ComponentEmit<typeof ElSwitch>>
    componentSlots?: ComponentSlots<typeof ElSwitch>
  } & FormItemRawConfig<T>
  ElTimePicker: {
    component: 'ElTimePicker'
    componentProps?: ComponentProps<typeof ElTimePicker> & FormatEmits<ComponentEmit<typeof ElTimePicker>>
    componentSlots?: ComponentSlots<typeof ElTimePicker>
  } & FormItemRawConfig<T>
  ElTimeSelect: {
    component: 'ElTimeSelect'
    componentProps?: ComponentProps<typeof ElTimeSelect> & FormatEmits<ComponentEmit<typeof ElTimeSelect>>
    componentSlots?: ComponentSlots<typeof ElTimeSelect>
  } & FormItemRawConfig<T>
  ElTransfer: {
    component: 'ElTransfer'
    componentProps?: ComponentProps<typeof ElTransfer> & FormatEmits<ComponentEmit<typeof ElTransfer>>
    componentSlots?: ComponentSlots<typeof ElTransfer>
  } & FormItemRawConfig<T>
  ElTreeSelect: {
    component: 'ElTreeSelect'
    componentProps?: ComponentProps<typeof ElTreeSelect> & FormatEmits<ComponentEmit<typeof ElTreeSelect>>
    componentSlots?: ComponentSlots<typeof ElTreeSelect>
  } & FormItemRawConfig<T>
  ElUpload: {
    component: 'ElUpload'
    componentProps?: ComponentProps<typeof ElUpload> & FormatEmits<ComponentEmit<typeof ElUpload>>
    componentSlots?: ComponentSlots<typeof ElUpload>
  } & FormItemRawConfig<T>
  ElSegmented: {
    component: 'ElSegmented'
    componentProps?: ComponentProps<typeof ElSegmented> & FormatEmits<ComponentEmit<typeof ElSegmented>>
    componentSlots?: ComponentSlots<typeof ElSegmented>
  } & FormItemRawConfig<T>
}
export type CustomComponentRawConfig<T = any> = {
  component: Component
  componentProps?: any
  componentSlots?: Slots
} & FormItemRawConfig<T>

export type ConfigFormConfig<T = any> = ValueOf<ComponentRawConfigMap<T>> | CustomComponentRawConfig<T>

export const COMPONENT_MAP: Record<keyof ComponentRawConfigMap, Component> = {
  // ElRow,
  // ElCol,
  ElAutocomplete,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElInputTag,
  ElMention,
  ElRadio,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElTreeSelect,
  ElUpload,
  ElSegmented,
}
