<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const titleName = ref(route.meta.titleName);

const handleClick = () => {
  router.push({
    name: 'home',
  })
};


</script>

<template>
  <section class="test-view-head">
    <div class="icon">图标</div>
    <div class="test-view-title">{{ titleName }}</div>
    <el-button class="back-home-button" @click="handleClick">回到首页</el-button>
  </section>

</template>

<style scoped>
.test-view-head {
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  line-height: 40px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
}

.icon {
  width: 50px
}

.test-view-title {
  width: 100%;
  text-align: center;
}

.back-home-button {
  width: 100px;
}
</style>