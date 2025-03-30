<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { ConfigForm } from '@config-ui/element-plus-config'
import type { ConfigFormConfig } from '@config-ui/element-plus-config'
import { ElMessage } from 'element-plus'

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: String(idx + 1),
  label: String(idx + 1),
}))

const locationOptions = ['Home', 'Company', 'School']

const formRef = useTemplateRef('formRef')

const formModel = ref({
  name: undefined,
  count: undefined,
  region: undefined,
  delivery: undefined,
  location: undefined,
  desc: undefined,
})

const formConfig = ref<ConfigFormConfig<typeof formModel.value>>([
  {
    formItemProps: {
      label: 'Activity name',
      prop: 'name',
      required: true,
    },
    component: 'input',
    componentProps: {
      placeholder: 'Activity name',
    },
  },
  {
    formItemProps: {
      label: 'Activity zone',
      prop: 'region',
      required: true,
    },
    component: 'select-v2',
    componentProps: {
      placeholder: 'Activity zone',
      options: [
        { label: 'Zone one', value: 'shanghai' }, // 修正拼写错误: lable -> label
        { label: 'Zone two', value: 'beijing' }, // 修正拼写错误: lable -> label
      ],
    },
  },
  {
    formItemProps: {
      label: 'Activity count',
      prop: 'count',
      required: true,
    },
    component: 'select-v2',
    componentProps: {
      placeholder: 'Activity count', // 添加逗号
      options: options,
    },
  },
  {
    formItemProps: {
      label: 'Instant delivery',
      prop: 'delivery',
      required: true,
    },
    component: 'switch',
    componentProps: {},
  },
  {
    formItemProps: {
      label: 'Activity location',
      prop: 'location',
      required: true,
    },
    component: 'segmented',
    componentProps: {
      options: locationOptions,
    },
  },
  {
    formItemProps: {
      label: 'Activity desc',
      prop: 'desc',
    },
    component: 'input',
    componentProps: {
      type: 'textarea',
    },
  },
])

const resetHandle = () => {
  formRef.value?.formRef?.resetFields()
}
const submitHandle = async () => {
  console.log('formModel', formModel.value)

  try {
    await formRef.value?.formRef?.validate()
    ElMessage.success('submit success')
  } catch (error) {
    ElMessage.error(Object.values(error)?.[0]?.[0].message)
  }
}
</script>

<template>
  <div>
    <ConfigForm
      ref="formRef"
      v-model="formModel"
      :form-config="formConfig"
      :form-raw-config="{
        labelWidth: 'auto',
      }"
      :row-config="{
        gutter: 15,
      }"
    />
    <div class="btn-box">
      <el-button type="default" @click="resetHandle">重置</el-button>
      <el-button type="primary" @click="submitHandle">提交</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
