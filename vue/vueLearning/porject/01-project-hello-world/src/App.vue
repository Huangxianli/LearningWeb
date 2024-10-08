<template>
  <div id="app">
    <div>这里是整个页面的根组件</div>
    <div class="router-button-box">
      <router-link to="/home" tag="button" class="router-button">点击跳转到home</router-link>
      <router-link to="/about" tag="button" class="router-button">点击跳转到about</router-link>
      <router-link to="/exampleVuex" tag="button" class="router-button">vuex案例</router-link>
    </div>
    <router-view>
      默认的内容
    </router-view>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>
<style scoped>
.router-button-box {
  height: 36px;
  border-bottom: 1px solid black;
  margin-top: 8px;
  margin-bottom: 8px;
}
.router-button {
  height: 30px;
  margin-right: 8px;
  background-color: rgba(5a, 5a, 5a, 0.5);
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}
</style>
