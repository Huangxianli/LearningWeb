<script setup lang="ts">
import { ref } from 'vue';
import type { ListItem } from './types';

const list = ref<ListItem[]>([
  { id: 1, name: 'name1' },
  { id: 2, name: 'name2' },
  { id: 3, name: 'name3' },
]);
</script>

<template>
  <div>
    <slot name="list" v-bind="{ list }"></slot>
  </div>
</template>

<style scoped></style>
