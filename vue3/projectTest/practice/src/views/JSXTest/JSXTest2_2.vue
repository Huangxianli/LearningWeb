<script setup lang="ts">
import type { VNodeChild } from 'vue';

const slots = defineSlots<{
  default: () => VNodeChild;
}>();
</script>

<template>
  <div>
    <!-- {{ slots.default ? slots.default() : '默认的 default' }} -->
    <!-- 在 .vue 文件的 template 中，不能这么使用 -->

    <slot name="default"> 默认的 default </slot>

    <!-- <div v-html="slots.default ? slots.default() : '默认的 default'"></div> -->
    <!-- 渲染的内容是 [object Object]，因为返回的是 VNode -->
  </div>
</template>

<style scoped></style>
