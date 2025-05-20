<script setup lang="ts">
import SlotTest5_1 from './SlotTest5_1';
import type { Ref } from 'vue';
import type { ListItem } from './types';

const addItem = (list: Ref<ListItem[]>) => {
  list.value.push({
    id: list.value.length,
    name: `name${list.value.length}`,
  });
};
</script>

<template>
  <SlotTest5_1 #default="{ list }">
    <div v-for="item in list.value" :key="item.id">{{ item.name }}</div>
    <!-- 注意这里的 list 没有被解包 -->
    <el-button @click="addItem(list)">增加</el-button>
  </SlotTest5_1>
</template>

<style scoped></style>
