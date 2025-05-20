<script setup lang="ts">
import SlotTest3_1 from './SlotTest3_1.vue';
</script>

<template>
  <!-- v-slot 只能运用到 template 上，有一种情况除外，当组件内部只定义了 template 插槽时，那么在使用该组件的时候，可以将 v-slot 写在该组件标签上 -->
  <SlotTest3_1 #default="{ list }">{{ list }} </SlotTest3_1>
</template>

<style scoped></style>
