<script setup lang="ts">
import TodoInput from '@/views/home/todoList/TodoInput.vue';
import TodoTable from '@/views/home/todoList/TodoTable.vue';
import TodoTotal from '@/views/home/todoList/TodoTotal.vue';
</script>

<template>
  <div class="todo-list-container">
    <div class="todo-list">
      <div class="todo-list-title">todo list</div>
      <TodoInput />
      <TodoTable />
      <TodoTotal />
    </div>
  </div>
</template>

<style scoped>
.todo-list-container {
  width: 100%;
  text-align: center;
}

.todo-list {
  width: 500px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 0 auto;
}

.todo-list-title {
  margin-bottom: 8px;
}
</style>
