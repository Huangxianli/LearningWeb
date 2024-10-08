<template>
  <div>
    <div class="head-container">
      <router-view name="head" />
    </div>
    <hr />
    <router-view name="main" />
  </div>
</template>

<script>
export default {

}
</script>

<style>
.head-container {
  height: 36px;
}
</style>