<script setup lang="ts">
import BottomNavItemView from './BottomNavItem.vue';
import type { BottomNavItem } from './bottomNav';

const { bottomNavItems } = defineProps<{ bottomNavItems: BottomNavItem[] }>();
</script>

<template>
  <div class="bottom-nav">
    <BottomNavItemView v-for="item in bottomNavItems" :key="item.key" :navItem="item" />
  </div>
</template>

<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
}
</style>