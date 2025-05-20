<script setup lang="ts">
import SlotTest1_1 from './SlotTest1_1.vue';
</script>

<template>
  <SlotTest1_1>
    <template #header> header </template>
    <div class="slot_test_1_default">
      没有显式的使用 template #default
      的情况下，所有游离的内容会被当做默认插槽的内容
    </div>
  </SlotTest1_1>
</template>

<style scoped>
.slot_test_1_default {
  height: 200px;
}
</style>
