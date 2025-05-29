# ConfigForm

配置化的表单组件。支持表单项的显示、校验、联动等常见功能，可自定义组件和布局，提供完整的类型提示。

## 代码示例

::: demo category="element-plus"
./demos/Demo1.vue
:::

## API

### Props

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| v-model | 表单数据对象 | `Record<string, unknown>` | 是 | - |
| formConfig | 表单配置数组，用于定义表单项 | `FormConfig[]` | 是 | - |
| formRawConfig | ElForm 组件的原生配置项 | `Exclude<FormProps, 'model'>` | 否 | - |
| rowConfig | ElRow 组件的配置项 | `ComponentProps<ElRow>` | 否 | - |

### 配置类型说明

#### FormItemConfig

表单项配置对象的类型定义：

| 属性名 | 说明 | 类型 | 必填 | 默认值 |
|--------|------|------|------------|--------------|
| field | 表单项字段名 | `UnionKey<T>` | 是 | - |
| component | 使用的表单控件 | `keyof ComponentRawConfigMap \| Component` | 是 | - |
| formItemProps | Form-Item 的属性 | `ValueOrFn<Exclude<ComponentProps<ElFormItem>, 'prop'> & { prop?: UnionKey<T> }>` | 否 | - |
| formItemSlots | Form-Item 的插槽 | `ComponentSlots<ElFormItem>` | 否 | - |
| componentProps | 控件的属性 | `ValueOrFn<ComponentProps<ElInput \| ElSelect \| ...>>` | 否 | - |
| componentSlots | 控件的插槽 | `ComponentSlots<ElInput \| ElSelect \| ...>` | 否 | - |
| colProps | 布局属性 | `ValueOrFn<ComponentProps<ElCol>>` | 否 | - |
| isVisible | 是否显示 | `(model: T) => boolean` | 否 | - |

> - `field` 和 `formItemProps.prop` 必须设置其中之一，推荐使用 `field`
> - `type ValueOrFn<V = any> = V | (() => V)`

#### 支持的表单控件

组件默认支持以下 Element Plus 表单控件：

| 控件类型 | 组件名 | 说明 |
|---------|--------|------|
| 输入框 | `ElInput` | 文本输入框 |
| 选择器 | `ElSelect/ElSelectV2` | 下拉选择框，V2版本性能更好 |
| 级联选择 | `ElCascader` | 级联选择器 |
| 日期选择 | `ElDatePicker` | 日期/日期范围选择器 |
| 时间选择 | `ElTimePicker/ElTimeSelect` | 时间/时间范围选择器 |
| 开关 | `ElSwitch` | 切换开关 |
| 多选框 | `ElCheckbox/ElCheckboxGroup` | 复选框及复选框组 |
| 单选框 | `ElRadio` | 单选框 |
| 数字输入 | `ElInputNumber` | 数字输入框 |
| 标签输入 | `ElInputTag` | 标签输入框 |
| 颜色选择 | `ElColorPicker` | 颜色选择器 |
| 评分 | `ElRate` | 评分组件 |
| 滑块 | `ElSlider` | 滑动输入条 |
| 穿梭框 | `ElTransfer` | 双列表穿梭框 |
| 树形选择 | `ElTreeSelect` | 树形选择器 |
| 文件上传 | `ElUpload` | 文件上传 |
| 自动完成 | `ElAutocomplete` | 带建议的输入框 |
| 提及 | `ElMention` | @提及功能输入框 |
| 分段控制 | `ElSegmented` | 分段控制器 |

#### 自定义表单控件

除了上述 Element Plus 内置的表单控件，`component` 属性支持传入自定义表单控件组件：

```ts
{
  field: 'xxx',
  component: YourComponent,
  componentProps: {
    size: 'large',
    placeholder: '自定义占位符'
  },
  componentSlots: {
    append: () => <div>...</div>
  }
}
```

### Exposed

| 名称 | 说明 | 类型 |
|------|------|------|
| formRef | 获取内部 ElForm 实例 | `Ref<FormInstance>` |
