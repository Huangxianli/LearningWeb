<script>
export default {
  data () {
    return {
      tableData: [],
    }
  },
  created () {
    for (let i = 0; i <= 10; i++) {
      this.tableData.push({
        name: 'name' + i
      })
    }
  }
}
</script>

<template>
  <section class="test-table">
    <div class="table-header"></div>
    <div class="table-box">
      <el-table :data="tableData" size="mini">
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <div class="pagination-box">
      </div>
    </div>
  </section>
</template>

<style scoped>
.test-table {
  box-sizing: border-box;
  height: calc(100% - 8px);
  display: flex;
  flex-direction: column;
}

.table-header {
  flex: 0 0 1px;
}

.table-box {
  overflow: auto;
}

.pagination-box {
  flex: 0 0 auto;
  height: 50px;
  background-color: red;
  flex-shrink: 0;
  margin-top: 12px
}
</style>