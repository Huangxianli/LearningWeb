<script setup lang="ts">
import SlotTest2_1 from './SlotTest2_1.vue';
import type { ListItem } from './types';

const addListItem = (list: ListItem[]) => {
  list.push({
    id: list.length + 1,
    name: `name${list.length + 1}`,
  });
};
</script>

<template>
  <SlotTest2_1>
    <template #list="{ list }">
      <ul>
        <li v-for="item in list" :key="item.id">{{ item.name }}</li>
      </ul>
      <el-button @click="addListItem(list)">增加</el-button>
    </template>
  </SlotTest2_1>
</template>

<style scoped></style>
