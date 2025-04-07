<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { ConfigSearchPage } from '@config-ui/element-plus-config'

const configSearchPageRef = useTemplateRef('configSearchPageRef')

const formModel = ref({})
const formConfig = ref({})
</script>

<template>
  <div>
    <ConfigSearchPage ref="configSearchPageRef" v-model="formModel" :form-config="formConfig" />
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
