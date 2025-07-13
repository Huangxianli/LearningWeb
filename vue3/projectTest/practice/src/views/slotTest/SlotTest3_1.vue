<script setup lang="ts">
import { ref, type VNodeChild } from 'vue';

defineSlots<{
  default: (props: { list: number[] }) => VNodeChild;
}>();

const list = ref<number[]>([2, 3, 4, 5, 6]);
</script>

<template>
  <div>
    <slot name="default" :list="list"> 默认插槽的占位内容 </slot>
  </div>
</template>

<style scoped></style>
