<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

const inputRef: Ref<HTMLInputElement | null> = ref(null);
const clickHandler = () => {
  inputRef.value?.focus();
};
</script>

<template>
  <el-card>
    <el-input ref="inputRef" placeholder="请输入" />
    <el-button type="primary" @click="clickHandler">聚焦</el-button>
  </el-card>
</template>

<style scoped></style>
