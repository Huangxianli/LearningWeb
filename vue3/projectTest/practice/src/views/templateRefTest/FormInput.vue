<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import type { Ref } from 'vue';
import type { FormData } from './types';
import { ElForm } from 'element-plus';

type FromType = InstanceType<typeof ElForm>;

const formData: Ref<FormData> = ref({
  name: '',
});
const formRules = {
  name: [
    {
      required: true,
      message: '姓名必填',
      trigger: ['blur', 'change'],
    },
  ],
};

const formRef = useTemplateRef<FromType>('form');
const valid = (): boolean => {
  let validPass = false;
  formRef.value?.validate((pass) => {
    validPass = pass;
  });
  return validPass;
};

defineExpose({
  valid,
});
</script>

<template>
  <el-form :model="formData" ref="form" :rules="formRules">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formData.name" type="text" />
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
