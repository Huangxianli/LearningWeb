<script setup lang="ts">
import { reactive } from 'vue';
import type { BottomNavItem } from '@/componets/bottomNav/bottomNav';
import BottomNav from '@/componets/bottomNav/BottomNav.vue';
const bottomNavItems = reactive<BottomNavItem[]>([
  {
    icon: '',
    name: '我的',
    routeName: 'root',
    key: '1'
  },
  {
    icon: '',
    name: '购物车',
    routeName: 'shopCart',
    key: '2'
  },
  {
    icon: '',
    routeName: 'goodsList',
    name: '商品列表',
    key: '3'
  },
]);
</script>

<template>
  <div class="app-view">
    <div class="app-conten-view">
      <RouterView />
    </div>
    <BottomNav :bottomNavItems="bottomNavItems" />
  </div>
</template>

<style scoped>
.app-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app-conten-view {
  height: calc(100vh - 50px);
  overflow: auto;
}
</style>
