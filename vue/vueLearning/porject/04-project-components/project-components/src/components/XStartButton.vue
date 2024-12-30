<template>
  <el-button v-bind="$attrs" v-on="$listeners">
    <template #default>
      <slot name="default"></slot>
    </template>
  </el-button>
</template>

<script>
export default {
  created () {
    const click = this.$listeners.click;
    this.$listeners.click = async function () {
      const isConfirm = confirm('是否点击');
      if (isConfirm) {
        click();
      }
    }
  },

}
</script>

<style></style>