<template>
  <section>
    <div class="project-phase-title">项目阶段</div>
    <div class="project-phase-button-box">
      <el-button size="small" type="primary">新增</el-button>
    </div>
    <el-table :data="tableData" size="mini" max-height="216">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="phase" label="阶段"></el-table-column>
      <el-table-column prop="amount" label="金额"></el-table-column>
      <el-table-column prop="ratio" label="比例"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <el-button size="mini" plain type="primary">编辑</el-button>
        <el-button size="mini" plain type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data () {
    function setTableData () {
      const tableData = [];
      for (let i = 0; i < 32; i++) {
        const rowData = {
          key: i,
          phase: 'phase' + i,
          amount: 'amount' + i,
          ratio: 'ratio' + i,
        };
        tableData.push(rowData);
      }
      return tableData;
    }

    return {
      tableData: setTableData(),
    };
  },
  methods: {
    validate () {
      return true;
    }
  }
}
</script>

<style scoped>
.project-phase-title {
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 12px;
}

.project-phase-button-box {
  margin-bottom: 12px;
}

.el-button--mini {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>