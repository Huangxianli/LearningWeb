<script setup lang="ts">
import { useModel } from 'vue';

const modelValue = defineModel({
  required: true,
  type: String,
});
// const emit = defineEmits(['update:modelValue']);
// defineModel 会在 modelValue 变化的时候，自动的 emit('update:modelValue', modelValue); 不需要再手动的写（前提是没有写 set he get）

const props = defineProps<{ modelValue1: string }>();
defineEmits(['update:modelValue1']);
const modelValue1 = useModel(props, 'modelValue1');
// useModel 创建的 model 也会在 modelValue1 发生改变的时候自动的触发 emit('update:modelValue1', modelValue1)（前提是没有写 set he get）
</script>

<template>
  <div>input 绑定的值：{{ modelValue }}</div>
  <input
    :value="modelValue"
    @input="modelValue = ($event.target as HTMLInputElement).value"
  />
  <div>input 绑定的值：{{ modelValue1 }}</div>
  <input type="text" v-model="modelValue1" />
</template>

<style scoped></style>
