<template>
  <div>
    <el-button icon="el-icon-s-home" @click="goHome">回到首页</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$router.push({
        name: 'home'
      })
    },
  },
}
</script>

<style>
</style>