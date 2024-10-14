<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
html {
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: calc(100% - 16px);
  overflow: hidden;
  margin: 8px 12px;
}

body::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  background-color: rgb(249, 249, 249);
}

body::-webkit-scrollbar-track {
  border-radius: 12px;
  width: 12px;
  height: 12px;
}

body::-webkit-scrollbar-thumb {
  height: 12px;
  width: 12px;
  border-radius: 10px;
  background-color: rgb(139, 139, 139);
}

body::-webkit-scrollbar-track-piece {
  border-radius: 12px;
}

body::-webkit-scrollbar-corner {
  height: 12px;
  width: 12px;
}

body::-webkit-resizer {
  width: 20px;
  height: 20px;
}
</style>
