<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  height: 100%;
  width: 100%;
  overflow: hidden;


}



/* 滚动条整体样式 */
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  /* 滚动条宽度 */
}

/* 滚动条轨道 */
*::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* 轨道背景颜色 */
}

/* 滚动条滑块 */
*::-webkit-scrollbar-thumb {
  background: #888;
  /* 滑块背景颜色 */
  border-radius: 5px;
  /* 滑块圆角 */
}

/* 滚动条滑块悬停时 */
*::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* 滑块悬停时背景颜色 */
}
</style>
