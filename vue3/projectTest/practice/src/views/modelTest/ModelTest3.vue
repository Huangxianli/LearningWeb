<script setup lang="ts">
import { defineModel, useModel } from 'vue';

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
    // 这种写法会到导致，当父组件的 modelValue 变化的时候，该组件无法获取到最新的值，也就是 父组件的改变不会映射到子组件
    return modelValueTemp;
  },
});

const props = defineProps<{
  modelName1?: string;
}>();
const modelValue1 = useModel(props, 'modelName1', {
  get(value) {
    return value;
  },
  set(value) {
    let tempValue = value;
    if (value?.length && value.length > 3) {
      tempValue = '';
    }
    return tempValue;
  },
});
</script>

<template>
  <h3>手动的 get set</h3>
  <div>input 绑定的值：{{ modelValue }}</div>
  <input type="text" v-model="modelValue" />
  <div>input 绑定的值：{{ modelValue1 }}</div>

  <input type="text" v-model="modelValue1" />
</template>

<style scoped></style>
