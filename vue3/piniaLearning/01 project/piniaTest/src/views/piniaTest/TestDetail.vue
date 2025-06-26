<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { usePiniaTestStore } from '@/stores/piniaTest';
const route = useRoute();
const router = useRouter();

const { id } = route.params;
const { getDetailInfoById } = usePiniaTestStore();
const detailInfo = getDetailInfoById(Number(id));

const goBackTestList = () => {
  router.push({
    name: 'piniaTest',
  });
};
</script>

<template>
  <div class="test-detail">
    <button @click="goBackTestList">回到测试列表</button>
    <div v-if="detailInfo">{{ `${detailInfo.name}--${detailInfo.discription}` }}</div>
    <div class="test-detail-main">
      <component v-if="detailInfo" :is="detailInfo.component"></component>
      <!-- 注意，如果是异步加载的组件，要使用 defineAsyncComponent() 包裹一下 -->
    </div>
  </div>
</template>

<style scoped>
.test-detail {
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  box-sizing: content-box;
  padding: 20px;
}
.test-detail-main {
  border: 1px solid #ccc;
  flex-grow: 1;
  margin-top: 20px;
  padding: 12px 8px;
}
</style>
