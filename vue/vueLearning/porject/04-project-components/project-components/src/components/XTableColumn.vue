<template>
  <el-table-column v-bind="$attrs" v-on="$listeners">
    <template #default="scoped">
      <slot name="default" v-bind="scoped" :model="store.getModel(scoped.$index)"></slot>
    </template>
  </el-table-column>
</template>

<script>

export default {
  inject: ['store'],
};
</script>

<style></style>