<script setup lang="ts">
</script>

<template>
  <section class="view-content-box">
    <slot></slot>
  </section>
</template>

<style scoped>
.view-content-box {
  box-sizing: border-box;
  padding: 8px;
  height: calc(100% - 40px);
  overflow: auto;
}
</style>