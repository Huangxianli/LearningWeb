<template>
  <div class="table-top">
    <el-table
      :data="tableData"
      border
      size="mini"
      :header-cell-class-name="setCellClass"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="name">
        <template v-slot:default="{ row }">
          <span> {{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="48">
        <template v-slot:default="{ row }">
          <i class="el-icon-delete can-click-c" @click="clickDelete(row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('vuexTest1', {
      newName: 'newName',
      tableData: 'tableData'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations('vuexTest1', {
      deleteTableRow: 'deleteTableRow'
    }),
    clickDelete (row) {
      this.deleteTableRow(row);
    },
    setCellClass () {
      return 'edit-header'
    }
  },
}
</script>

<style scoped>
.table-top {
  margin-top: 12px;
}
.el-icon-delete {
  cursor: pointer;
}
.can-click-c {
  color: #409eff;
}
</style>