<script setup lang="ts">
import { ref } from 'vue';
import FunctionalTest1 from './FunctionalTest1';
import FunctionalTest2 from './FunctionalTest2';
import FunctionalTest3 from './FunctionalTest3';
import FunctionalTest4 from './FunctionalTest4.vue';

const modelValue1 = ref<string>('');
const count = ref<number>(0);
const addCount = () => {
  count.value++;
};
const inputValue = ref<string>('');
</script>

<template>
  <el-card>
    <FunctionalTest1 v-model.upper="modelValue1"></FunctionalTest1>
    <div>modelValue1：{{ modelValue1 }}</div>
  </el-card>
  <el-card>
    <FunctionalTest2 :count="count" :add-count="addCount"></FunctionalTest2>
  </el-card>
  <el-card>
    <FunctionalTest3 v-slot:default="{ getInputValue }">
      <button
        @click="
          () => {
            debugger;
            inputValue = getInputValue();
          }
        "
      >
        点击获取 input 的value
      </button>
      {{ inputValue }}
    </FunctionalTest3>
  </el-card>
  <el-card>
    <FunctionalTest4 />
  </el-card>
</template>

<style scoped></style>
