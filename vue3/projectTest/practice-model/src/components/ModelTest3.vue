import { defineModel } from 'vue';
<script setup lang="ts">
import { defineModel } from 'vue';
let modelValueTemp = '';
const modelValue = defineModel('modelName', {
  set(value) {
    if (typeof value === 'string' && value.length < 3) {
      modelValueTemp = value;
    } else {
      modelValueTemp = '';
    }
    return modelValueTemp;
  },
  get() {
    return modelValueTemp;
  },
});
</script>

<template>
  <div>
    <div>input 绑定的值：{{ modelValue }}</div>
    <input type="text" v-model="modelValue" />
  </div>
</template>

<style scoped></style>
