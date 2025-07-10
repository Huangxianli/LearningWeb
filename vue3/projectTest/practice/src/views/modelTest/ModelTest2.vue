<script setup lang="ts">
import { defineModel, useModel } from 'vue';
const modelValue = defineModel('modelName', {
  type: String,
  // required: true,
  required: false,
});

const props = defineProps<{ modelName1?: string }>();
const modelValue1 = useModel(props, 'modelName1');
defineEmits(['update:modelName1']);
</script>

<template>
  <h3>自定义名称 model，非必传 model</h3>
  <div>input 绑定的值：{{ modelValue }}</div>
  <input
    type="text"
    :value="modelValue"
    @input="modelValue = ($event.target as HTMLInputElement).value"
  />
  <div>input 绑定的值：{{ modelValue1 }}</div>
  <input v-model="modelValue1" />
</template>

<style scoped></style>
