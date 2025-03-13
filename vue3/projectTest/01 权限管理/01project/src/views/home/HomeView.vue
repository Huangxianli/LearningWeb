<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

interface TableRow {
  testComponentName: string,
  testRouteName: string,
}
const tableData: TableRow[] = [{
  testComponentName: '普通表格',
  testRouteName: 'tableTest'
}];
type HandeClick = (row: TableRow) => void;
const handleClick: HandeClick = row => {
  router.push({
    name: row.testRouteName
  });
}

</script>

<template>
  <div>
    <el-table :data="tableData" size="mini">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="名称" prop="testComponentName"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="handleClick(row)">查看示例</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>