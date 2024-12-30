<template>
  <section>
    <slot name="table-header-button" :addRow="addRow"></slot>
    <el-table v-bind="$attrs" v-on="$listeners" size="mini">
      <template #default>
        <slot name="default" :editRow="editRow" :deleteRow="deleteRow" :confirm="confirm" :editRowsId="editRowsId">
        </slot>
      </template>
    </el-table>
  </section>
</template>

<script>

export default {
  provide () {
    return {
      editRowsId: this.editRowsId
    }
  },
  data () {
    return {
      editRowsId: [],
    }
  },
  computed: {
    maxRowId () {
      return this.$attrs.data.reduce((max, row) => Math.max(max, row.rowId), 0);
    }
  },
  methods: {
    addRow () {
      this.$attrs.data.push(
        {
          rowId: this.maxRowId + 1
        }
      );
      // 注意，前面已经修改了 this.$attrs.data 但是 其 computed maxRowId 在这个回调中没有更新，导致下面的代码 也要 this.maxRowId + 1，如果下面的代码放在 nextTick 或者是 setTimeout 中，就可以正常获取到最新的 maxRowId
      this.editRowsId.push(this.maxRowId + 1);
    },

    editRow (scoped) {
      this.editRowsId.unshift(scoped.row.rowId);
    },

    deleteRow (scoped) {
      const index = this.$attrs.data.findIndex(row => row.rowId === scoped.row.rowId);
      this.$attrs.data.splice(index, 1);
      const index1 = this.editRowsId.findIndex(rowId => rowId === scoped.row.rowId);
      this.editRowsId.splice(index1, 1);
    },

    confirm (scoped) {
      const index1 = this.editRowsId.findIndex(rowId => rowId === scoped.row.rowId);
      this.editRowsId.splice(index1, 1);
    },
  }
}
</script>

<style></style>