<script setup lang="ts">
import { ref } from 'vue';

const arr = ref(Array.from({ length: 10 }).map((_, index) => index));
const inputRefs: Map<number, HTMLInputElement> = new Map();

const shift = () => {
  arr.value.shift();
};
const focus3 = () => {
  inputRefs.get(3)?.focus();
};
</script>

<template>
  <el-card>
    <div>
      <template v-for="item in arr" :key="item">
        {{ item }}
        <input
          type="text"
          :ref="
          (el) => {
            if (el) {
              inputRefs.set(item, el as HTMLInputElement);
            } else {
              inputRefs.delete(item);
            }
          }
        "
        />
        <br />
      </template>
      <button @click="shift">删除第一个</button>
      <button @click="focus3">聚焦3</button>
    </div>
  </el-card>
</template>

<style scoped></style>
