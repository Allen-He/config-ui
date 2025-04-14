---
title: HelloWorld 组件
---

<script setup>
import { ref } from 'vue'
import { HelloWorld } from '@config-ui/ant-design-vue-config'

const count = ref(0)
</script>

<HelloWorld msg="Hello World ~" />

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
