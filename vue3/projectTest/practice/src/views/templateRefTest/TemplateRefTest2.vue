<script setup lang="ts">
import { useTemplateRef } from 'vue';
import type { Ref } from 'vue';

// const inputRef = useTemplateRef<HTMLInputElement>('input');
const inputRef: Ref<HTMLInputElement | null> =
  useTemplateRef<HTMLInputElement>('input');

const inputHandler = () => {
  inputRef.value?.focus();
};
</script>

<template>
  <el-card>
    <el-input type="text" ref="input" />
    <el-button @click="inputHandler">聚焦</el-button>
  </el-card>
</template>

<style scoped></style>
