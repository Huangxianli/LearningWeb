<script setup lang="ts">
import { defineSlots, ref } from 'vue';
import type { VNode } from 'vue';
import type { ListItem } from './types';
const slots = defineSlots<{
  // 注意这里是标注定义，也是标注使用
  default: (props: { list: ListItem[] }) => VNode[] | VNode;

  header?: () => VNode[] | VNode;
  // 在使用该组件的时候，不一定要传入 header，可以该插槽可以接收的内容为 VNode[] | VNode
  footer: () => VNode[];
}>();
// definSlots() 的返回值是一个对象，对象里面是使用该组件时传入的插槽对应的函数

const list = ref<ListItem[]>([{ id: 0, name: 'name0' }]);
</script>

<template>
  <div>
    <slot name="header"></slot>
  </div>
  <div>
    <slot name="default" :list="list"></slot>
  </div>
  <div>
    <slot name="footer"></slot>
  </div>
</template>

<style scoped></style>
