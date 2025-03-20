import router from './router/index';
<script setup lang="ts"></script>

<template>
  <div class="container">
    <section class="left-container">
      <router-view>左侧的菜单</router-view>
    </section>
    <section class="right-container">
      <div>
        <router-view>头部的内容</router-view>
      </div>
      <div>
        <router-view>主要内容区</router-view>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.left-container {
  height: 100%;
}
.right-container {
  height: 100%;
}
</style>
