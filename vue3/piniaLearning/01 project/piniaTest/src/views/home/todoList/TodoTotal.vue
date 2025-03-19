<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useTodoListStore } from '@/stores/todoList';
import type { TodoItem } from '@/stores/todoList';
const todoListStore = useTodoListStore();

const isDoneList = computed(() => todoListStore.todoList.filter((item: TodoItem) => item.isDone));

// 全选逻辑
const handleChange = (e: Event) => {
  todoListStore.selectAll((e.target as HTMLInputElement).checked);
};
const checked = ref(false);
watchEffect(() => {
  checked.value = Boolean(todoListStore.todoList.length) && isDoneList.value.length === todoListStore.todoList.length;
});

// 清除已选逻辑
const handleClick = () => {
  todoListStore.clearSelect();
};
</script>

<template>
  <div class="todo-total">
    <span>已完成 {{ isDoneList.length }} / {{ todoListStore.todoList.length }}</span>
    <div>全选<input type="checkbox" v-model="checked" :disabled="!todoListStore.todoList.length" @change="handleChange">
    </div>
    <button :disabled="!isDoneList.length" class="clean-button" @click="handleClick">清除已选</button>
  </div>
</template>

<style scoped>
.todo-total {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
  padding: 2px 0;
  line-height: 20px;
}

.clean-button {
  line-height: 16px;
}
</style>
