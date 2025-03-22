<script setup lang="ts">
import { ref } from 'vue';
import { useTodoListStore } from '@/stores/todoList';
const todoListStore = useTodoListStore();
const toDoName = ref('');
const handleClick = () => {
  addTask();
};
const handleUpEnter = () => {
  addTask();
};
const addTask = () => {
  if (toDoName.value) {
    todoListStore.addTodoItem(toDoName.value.trim());
    toDoName.value = '';
  }
}
</script>

<template>
  <div class="todo-input-container">
    <input v-model="toDoName" class="todo-input" type="text" placeholder="请输入代办事项，点击添加按钮或键入回车键添加"
      @keyup.enter="handleUpEnter" />
    <button class="add-button" :disabled="!toDoName" @click="handleClick">添加</button>
  </div>
</template>

<style scoped>
.todo-input-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.todo-input {
  height: 20px;
  flex-grow: 1;
  margin-right: 8px;
  cursor: text;
  outline: none;
}

.todo-input:hover {
  cursor: text;
}

.add-button {
  width: 60px;
  line-height: 20px;
}
</style>
