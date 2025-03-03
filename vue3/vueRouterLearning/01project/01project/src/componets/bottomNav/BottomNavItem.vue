<script setup lang="ts">

import type { BottomNavItem } from './bottomNav';
import { useRouter } from 'vue-router';
const { navItem } = defineProps<{ navItem: BottomNavItem }>();

const router = useRouter();
const handleClick = () => {
  router.push({
    name: navItem.routeName
  })
};

</script>

<template>
  <div class="bottom-nav-item" @click="handleClick">
    <span></span>
    <span>{{ navItem.name }}</span>
  </div>
</template>

<style scoped>
.bottom-nav-item {
  cursor: pointer;
}
</style>