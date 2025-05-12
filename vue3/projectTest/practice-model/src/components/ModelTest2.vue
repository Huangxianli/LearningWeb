<script setup lang="ts">
import { defineModel } from 'vue';
const modelValue = defineModel('modelName', {
  type: String,
  required: true,
});
</script>

<template>
  <div>
    <div>input 绑定的值：{{ modelValue }}</div>
    <input
      type="text"
      :value="modelValue"
      @input="modelValue = ($event.target as HTMLInputElement).value"
    />
  </div>
</template>

<style scoped></style>
