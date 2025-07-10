<script setup lang="ts">
import { defineModel, useModel } from 'vue';
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

const props = defineProps<{
  modelName2?: string;
  modelName2Modifiers?: {
    upper?: true;
  };
}>();
defineEmits(['update:modelName2']);
const modelValue2 = useModel(props, 'modelName2', {
  set(value) {
    let tempValue = value;
    if (props.modelName2Modifiers) {
      tempValue = value?.toUpperCase();
    }
    return tempValue;
  },
});
</script>

<template>
  <h3>v-model 修饰符</h3>
  <div>input 绑定的值：{{ modelValue1 }}</div>
  <input type="text" v-model="modelValue1" />
  <div>input 绑定的值：{{ modelValue2 }}</div>
  <input type="text" v-model="modelValue2" />
</template>

<style scoped></style>
