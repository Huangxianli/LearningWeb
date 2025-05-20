<script setup lang="ts">
import SlotTest4_1 from './SlotTest4_1.vue';
</script>

<template>
  <SlotTest4_1>
    <template #default="{ list }">
      <div v-for="item in list" :key="item.id">{{ item.name }}</div>
    </template>
  </SlotTest4_1>
</template>

<style scoped></style>
