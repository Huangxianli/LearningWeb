# 路由
## 客户端 vs 服务端路由
服务端是指根据用户访问的 URL 路径返回不同的响应结果
客户端是指 JS 拦截页面的跳转请求，动态获取新的数据，然后在无需重新加载的情况下更新当前页面，主要是利用 history api 或者是 hashchange 事件这样的浏览器 API 来管理当前页面应该渲染的视图

## 官方路由
[vue-router](https://router.vuejs.org/zh/)


## 从头开始实现一个简单的路由
```vue
<script setup>
import { ref, computed } from 'vue';

import Home from '';
import About from '';
import NotFind from '';
const routes = {
  '/': Home,
  '/about': About,
};

const currentPath = ref(window.loaction.hash);
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});
const currentView = computed(()=> {
  return routes[currentPath.value.slice(1) || '/'] || NotFind;
});
</script>

<template>
  <a href="#/"></a>
  <a href="#/About"></a>
  <a href="#/NotFind"></a>
  <component :is="currentView" />
</template>
```

