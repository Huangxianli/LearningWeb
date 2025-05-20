<script setup lang="ts">
import { useTemplateRef } from 'vue';
import FormInput from './FormInput.vue';

const formRef = useTemplateRef<InstanceType<typeof FormInput>>('form');
const clickHandler = () => {
  const data = formRef.value?.valid();
  console.log(data);
};
</script>

<template>
  <el-card>
    <FormInput ref="form" />
    <el-button @click="clickHandler">校验</el-button>
  </el-card>
</template>

<style scoped></style>
