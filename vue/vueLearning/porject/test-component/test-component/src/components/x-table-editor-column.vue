<template>
  <el-table-column v-bind="$attrs" v-on="$listeners">
    <template #default="scope">
      <slot name="edit" v-bind="scope" v-if="editRowsId && editRowsId.includes(scope.row.id)">
        <el-input v-model="scope.row[scope.column.property]" size="mini" />
      </slot>
      <slot v-else name="read" v-bind="scope">
        {{ scope.row[scope.column.property] }}
      </slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  inject: ['editRowsId']
}
</script>

<style scope></style>