<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const goBackList = () => {
  router.push({
    name: 'testList',
  });
};
</script>

<template>
  <div class="test_detail">
    <header class="test_detail_header">
      <el-button @click="goBackList">返回列表页</el-button>
    </header>
    <main class="test_detail_main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped labg="less">
.test_detail {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .test_detail_header {
    padding: 10px 10px;
    border-bottom: 1px solid #000;
  }
  .test_detail_main {
    padding: 10px 10px;
    height: 100%;
    overflow: auto;
  }
}
</style>
