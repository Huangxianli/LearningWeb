<script setup lang="ts">
import { ref } from 'vue';

const list = ref([]);
</script>

<template>
  <div>
    <slot name="default" :list="list"> 默认插槽的占位内容 </slot>
  </div>
</template>

<style scoped></style>
