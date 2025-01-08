<template>
  <el-dialog :visible.sync="showDialog" title="项目进度申报记录" width="950px">
    <section>
      <div>
        <el-button type="primary" plain>新增申报</el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column type="index">序号</el-table-column>
        <el-table-cloumn v-for="item in tableCols" :key="item.prop" :prop="item.prop"
          :label="item.label"></el-table-cloumn>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </section>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      showDialog: true,
      tableData: [],
      tableCols: [
        { prop: "applicationProgress", label: "申报进度" },
        { prop: "applicationTime", label: "申报时间" },
        { prop: "applicant", label: "申报人" }
      ]
    }
  }
}
</script>

<style></style>