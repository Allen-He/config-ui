<template>
  <div class="demo-wrap">
    <client-only>
      <slot></slot>
    </client-only>
  </div>
</template>

<style lang="scss">
.demo-wrap {
  position: relative;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
</style>
