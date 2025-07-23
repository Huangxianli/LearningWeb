<script setup lang="ts">
import { ref } from 'vue';
import type { ImportTest1 } from './importTest1';
const modules = import.meta.glob<ImportTest1>('./importTest1.ts', {
  eager: true,
});

const count = ref(0);
const increase = () => {
  count.value = modules['./importTest1.ts'].increase(count.value);
};
const decrease = () => {
  count.value = modules['./importTest1.ts'].decrease(count.value);
};

const modules1 = import.meta.glob<ImportTest1>('./importTest2.ts');
const increase1 = async () => {
  count.value = await modules1['./importTest2.ts']().then((res) =>
    res.increase(count.value)
  );
};
const decrease1 = async () => {
  count.value = await modules1['./importTest2.ts']().then((res) =>
    res.decrease(count.value)
  );
};
</script>

<template>
  <div>count is : {{ count }}</div>
  <div>
    <button @click="increase">增加</button>
    <button @click="decrease">减少</button>
  </div>
  <div>
    <button @click="increase1">增加异步</button>
    <button @click="decrease1">减少异步</button>
  </div>
</template>

<style scoped></style>
