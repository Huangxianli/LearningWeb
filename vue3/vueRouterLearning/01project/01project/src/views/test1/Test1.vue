<script setup lang="ts">
import { useRouter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

const router = useRouter();

// beforeRouteEnter 不能在 <script setup> 中使用，但是如果是选项式的写法，是有这个回调钩子的

onBeforeRouteLeave(() => {
  // 在导航离开渲染该组件的对应路由时调用，如果从一个路由跳转到一个路由，但是两个路由都使用了这个组件（准确的说，如果这个组件没有失活），那么就不会触发这个回调，只有第一个路由使用了这个组件，第二个路由没有使用这个组件才会触发这个回调
  debugger
});
onBeforeRouteUpdate((to, from) => {
  // 在当前路由改变，但是该组件被复用时调用
  debugger
  // return false; // 可以中断跳转，但是还是会执行 afterEach 全局后置钩子，to、from 和这个的保持一致
  /* return { // return 一个新的 route 的时候，会进入直接进入下论的路由周期，和 return false 的表现不一样
    name: 'home',
  }; */

});

const handleClick1 = () => {
  router.push({
    name: 'test1Child1',
  });
};
const handleClick2 = () => {
  debugger
  router.push({
    name: 'test1Child2'
  })
};

</script>

<template>
  <div class="test1">
    <ul class="test1-li">
      <li @click="handleClick1">test1Child1</li>
      <li @click="handleClick2">test1Child2</li>
      <li>test1Child3</li>
    </ul>
    <div class="test1-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.test1 {
  display: flex;
  flex-direction: row;
}

.test1-li {
  width: 100px;
  list-style-type: none;
  padding: 0;
}

.test1-content {
  border: 1px solid red;
  width: 100%;
}
</style>