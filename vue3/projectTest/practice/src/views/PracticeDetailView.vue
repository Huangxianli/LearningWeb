<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import type { RouteMeta } from 'vue-router';
interface TestDetailRouteMeta {
  testInfo: {
    name: string;
  };
}

const router = useRouter();
const route = useRoute();

const goBackList = () => {
  router.push({
    name: 'practiceList',
  });
};
</script>

<template>
  <div class="practice_detail_header">
    <div class="practice_detail_header_info">
      模块：{{
        (route.meta as RouteMeta & TestDetailRouteMeta).testInfo?.name ?? ''
      }}
    </div>
    <el-button type="primary" @click="goBackList">回到列表页</el-button>
  </div>
  <div class="practice_detail_content">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.practice_detail_content :deep(.el-card.is-always-shadow) {
  margin-bottom: 8px;
}

.practice_detail_header {
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 12px;
}
.practice_detail_header_info {
  font-size: 18px;
  line-height: 40px;
}
</style>
