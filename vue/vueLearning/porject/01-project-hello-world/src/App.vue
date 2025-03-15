<template>
  <div id="app">
    <div class="router-button-box">
      <router-link to="/home" tag="button" class="router-button">点击跳转到home</router-link>
      <router-link to="/about" tag="button" class="router-button">点击跳转到about</router-link>
      <router-link to="/exampleVuex" tag="button" class="router-button">vuex案例</router-link>
      <router-link to="/testTable" tag="button" class="router-button">表格高度自适应</router-link>
    </div>
    <div class="content">
      <router-view>
        默认的内容
      </router-view>
    </div>

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
  box-sizing: content-box;
  height: 36px;
  border-bottom: 1px solid black;
  padding-top: 8px;
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

.content {
  height: calc(100% - 53px);
  margin: 0px;
}
</style>
