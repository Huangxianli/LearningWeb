import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export interface TodoItem {
  id: number
  name: string
  isDone: boolean
}

// 组合式的写法
// 要自己定义 $reset 方法来实现重置为初始值
export const useTodoListStore = defineStore('todoList', () => {
  let maxId = 0
  const todoList: Ref<TodoItem[]> = ref([])

  function addTodoItem(name: string) {
    todoList.value.unshift({
      id: maxId++,
      name,
      isDone: false,
    })
  }

  function deleteTodoItem(id: number) {
    todoList.value = todoList.value.filter((todoItem) => todoItem.id !== id)
  }

  function selectItem(id: number, isDone: boolean) {
    todoList.value = todoList.value.map((todoItem) => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          isDone,
        }
      }
      return todoItem
    })
  }
  function selectAll(isDone: boolean) {
    todoList.value = todoList.value.map((todoItem) => {
      return {
        ...todoItem,
        isDone,
      }
    })
  }
  function clearSelect() {
    todoList.value = todoList.value.filter((todoItem) => !todoItem.isDone)
  }

  return {
    todoList, // 注意使用的时候，不要结构，或者使用 storeToRef() 来进行解构才会响应式
    addTodoItem,
    deleteTodoItem,
    selectItem,
    selectAll,
    clearSelect,
  }
})

// 选项式的写法
// const todoListStore = useTodoListStore();
// store.$reset(); // 组合式写法可以直接调用 $reset 方法
/*
export const useTodoListStore = defineStore('todoList', () => {
  let maxId = 0
  stata: () => {
    return {
      todoList: [] as TodoItem[]
    }
  }

  function addTodoItem(name: string) {
    todoList.value.unshift({
      id: maxId++,
      name,
      isDone: false,
    })
  }

  function deleteTodoItem(id: number) {
    todoList.value = todoList.value.filter((todoItem) => todoItem.id !== id)
  }

  function selectItem(id: number, isDone: boolean) {
    todoList.value = todoList.value.map((todoItem) => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          isDone,
        }
      }
      return todoItem
    })
  }
  function selectAll(isDone: boolean) {
    todoList.value = todoList.value.map((todoItem) => {
      return {
        ...todoItem,
        isDone,
      }
    })
  }
  function clearSelect() {
    todoList.value = todoList.value.filter((todoItem) => !todoItem.isDone)
  }

  return {
    todoList, // 注意使用的时候，不要结构，或者使用 storeToRef() 来进行解构才会响应式
    addTodoItem,
    deleteTodoItem,
    selectItem,
    selectAll,
    clearSelect,
  }
})
 */
