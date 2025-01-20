<template>
  <section>
    <el-table size="mini" v-bind="$attrs" v-on="$listeners">
      <template #default="scope">
        <slot name="default" v-bind="scope" :editRow="editRow" :deleteRow="deleteRow">
        </slot>
      </template>
    </el-table>
  </section>
</template>

<script>
export default {
  provide () {
    return { editRowsId: this.editRowsId };
    // 如果使用 对象形式或者箭头函数会导致 this 指向有问题
  },
  data () {
    return {
      editRowsId: [],
    };
  },
  methods: {
    editRow (row) {
      if (this.editRowsId.some(id => id === row.id)) { return }
      this.editRowsId.push(row.id);
    },

    deleteRow (row) {
      const editorRowsIdIndex = this.editRowsId.indexOf(id => id === row.id);
      if (editorRowsIdIndex !== -1) {
        this.editRowsId.splice(editorRowsIdIndex, 1);
      }
      const tableDataIndex = this.$attrs.data.findIndex(tableRow => tableRow.id === row.id);
      if (tableDataIndex !== -1) {
        this.$attrs.data.splice(tableDataIndex, 1);
      }
    }
  }
}
</script>

<style></style>