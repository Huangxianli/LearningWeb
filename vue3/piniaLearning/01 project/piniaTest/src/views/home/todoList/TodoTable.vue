<script setup lang="ts">
import { useTodoListStore } from '@/stores/todoList';
import TodoItem from './TodoItem.vue';

const toListStore = useTodoListStore();
</script>

<template>
  <div class="todo-table">
    <div v-if="!toListStore.todoList.length" class="empty-todo">
      暂无代办事项，请添加
    </div>
    <template v-else>
      <TodoItem v-for="item in toListStore.todoList" :key="item.id" :row="item"></TodoItem>
    </template>
  </div>
</template>

<style scoped>
.todo-table {
  margin: 8px 0;
  padding: 8px 0;
  max-height: 280px;
  overflow: auto;
  border: 1px solid #ccc;
}

.empty-todo {
  color: gray;
  height: 200px;
  align-items: center;
  padding: auto;
  line-height: 200px;
}
</style>
