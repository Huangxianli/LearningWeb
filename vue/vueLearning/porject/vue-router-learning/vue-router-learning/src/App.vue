<template>
  <div class="app">
    <router-view name="menu" class="menu-view" />
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
  padding: 0;
}
</style>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
</style>
