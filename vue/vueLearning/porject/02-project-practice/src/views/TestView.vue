<template>
  <div class="test-view">
    <div class="head-container">
      <router-view name="head" />
    </div>
    <hr />
    <div class="test-view__main">
      <router-view name="main" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.test-view {
  height: 100%;
}

.head-container {
  height: 36px;
}

.test-view__main {
  height: calc(100% - 42px);
  overflow: auto;
}
</style>