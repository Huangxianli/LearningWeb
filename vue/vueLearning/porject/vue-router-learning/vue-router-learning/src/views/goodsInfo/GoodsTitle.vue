<template>
  <h3>{{ title }}</h3>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '商品标题'
    }
  }
}
</script>

<style></style>