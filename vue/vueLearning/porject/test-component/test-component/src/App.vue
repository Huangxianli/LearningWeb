<template>
  <div id="app">
    <test-view-1 />
    <test-view-2 />
  </div>
</template>

<script>
import TestView1 from './views/test-view-1.vue';
import TestView2 from './views/test-view-2.vue';
export default {
  name: 'App',
  components: {
    TestView1,
    TestView2
  }
}
</script>

<style scoped>
#app {
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  padding: 12px;
}
</style>
