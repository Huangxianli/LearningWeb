<template>
  <el-table-column v-bind="$attrs" v-on="$listeners">
    <template #default="scoped">
      <slot name="edit" v-bind="scoped" v-if="editRowsId.includes(scoped.row.rowId)"></slot>
      <slot name="show" v-else v-bind="scoped"></slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  inject: [
    'editRowsId'
  ],
}
</script>

<style></style>