<script setup lang="ts">
import { defineModel } from 'vue';
const [modelValue1, modifiers] = defineModel('modelName1', {
  type: String,
  required: true,
  set(value) {
    if (modifiers.upper) {
      return value.toUpperCase();
    }
    return '';
  },
});
</script>

<template>
  <div>
    <div>input 绑定的值：{{ modelValue1 }}</div>
    <input type="text" v-model="modelValue1" />
  </div>
</template>

<style scoped></style>
