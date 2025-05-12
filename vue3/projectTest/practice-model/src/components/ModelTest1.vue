<script setup lang="ts">
const modelValue = defineModel({
  required: true,
  type: String,
});
// const emits = defineEmits(['update:modelValue']);
// defineModel 会在 modelValue 变化的时候，自动的 emit('update:modelValue', modelValue); 不需要再手动的写
</script>

<template>
  <div>
    <div>input 绑定的值：{{ modelValue }}</div>
    <input
      :value="modelValue"
      @input="modelValue = ($event.target as HTMLInputElement).value"
    />
  </div>
</template>

<style scoped></style>
