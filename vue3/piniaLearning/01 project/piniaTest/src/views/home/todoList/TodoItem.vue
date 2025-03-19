<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TodoItem } from '@/stores/todoList';
import { useTodoListStore } from '@/stores/todoList';
const todoListStore = useTodoListStore();

import { defineProps } from 'vue';
const { row } = defineProps<{ row: TodoItem }>();
const handleClick = () => {
  todoListStore.deleteTodoItem(row.id);
};

const handleChange = (e: Event) => {
  todoListStore.selectItem(row.id, (e.target as HTMLInputElement).checked);
}
const checked = ref(false);
watch(() => row.isDone, (newValue) => {
  checked.value = newValue;
});

</script>

<template>
  <div class="todo-item">
    <div class="todo-item-checkbox-container">
      <input v-model="checked" class="todo-item-checkbox" type="checkbox" @change="handleChange" />
    </div>
    <div :class="{ 'is-done-name': row.isDone }" class="todo-item-name" :title="row.name">{{ row.name }}</div>
    <button class="todo-item-delete" @click="handleClick">删除</button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
  padding: 2px 0;
}

.todo-item-checkbox-container {
  height: 20px;
  width: 20px;
}

.todo-item-name {
  flex-grow: 1;
  margin: 0 8px;
  text-align: left;
  /* 防止文本换行 */
  white-space: nowrap;
  /* 隐藏超出部分 */
  overflow: hidden;
  /* 显示省略号 */
  text-overflow: ellipsis;
  line-height: 20px;
  height: 20px;
}

.is-done-name {
  color: gray;
  /* 添加删除线 */
  /* text-decoration: line-through; */
  position: relative;
}

.is-done-name::after {
  height: 1px;
  content: '';
  background-color: gray;
  position: absolute;
  top: 50%;
  right: 0;
  width: 100%;
}

.todo-item-delete {
  height: 20px;
  width: 60px;
  line-height: 16px;
  flex-shrink: 0;
}
</style>
