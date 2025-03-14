<script setup lang="ts">
import TestHead from '@/views/test/TestHead.vue';
import ViewContentBox from '@/components/ViewContentBox.vue';
</script>

<template>
  <div class="test-view">
    <TestHead></TestHead>
    <ViewContentBox>
      <router-view></router-view>
    </ViewContentBox>
  </div>
</template>

<style scoped>
.test-view {
  height: 100%;
}
</style>