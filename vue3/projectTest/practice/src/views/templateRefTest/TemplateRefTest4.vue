<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const arr = ref(Array.from({ length: 10 }).map((_, index) => index));
const inputRefs: Map<number, HTMLInputElement> = new Map();

const shift = () => {
  arr.value.shift();
};
const deletSecond = () => {
  arr.value.splice(1, 1);
};
const focus3 = () => {
  inputRefs.get(3)?.focus();
};

const input1Refs = useTemplateRef<HTMLInputElement[]>('input1Refs');
// 不推荐这种写法 ref 数组并不保证与源数组相同的顺序 在 TemplateRefTest5 可以看出来
const focus2 = () => {
  input1Refs.value![2].focus();
};

const input2Refs = ref<HTMLInputElement[]>([]);
// 不推荐这种写法 ref 数组并不保证与源数组相同的顺序 在 TemplateRefTest5 可以看出来
const focus4 = () => {
  input2Refs.value[4].focus();
};
</script>

<template>
  <el-card>
    <h3>多个元素的用法</h3>
    <div>
      <template v-for="item in arr" :key="item">
        {{ item }}
        <input
          type="text"
          :data-item="item"
          :ref="
          (el) => {
            console.log('item el', item, ' ', el);
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
      <button @click="deletSecond">删除第二个</button>
      <button @click="focus3">聚焦3</button>
    </div>
    <div>
      <template v-for="item in arr" :key="item">
        {{ item }}
        <input type="text" ref="input1Refs" />
        <br />
      </template>
      <button @click="focus2">聚焦2</button>
    </div>
    <div>
      <template v-for="item in arr" :key="item">
        {{ item }}
        <input type="text" ref="input2Refs" />
        <br />
      </template>
      <button @click="focus4">聚焦4</button>
    </div>
  </el-card>
</template>

<style scoped></style>
