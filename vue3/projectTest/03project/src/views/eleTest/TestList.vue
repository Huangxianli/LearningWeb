<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
interface TableRow {
  category: string;
  subcategoryCn: string;
  subcategory: string;
}
const data: TableRow[] = [
  {
    category: '表单',
    subcategoryCn: '多选框',
    subcategory: 'checkboxTest',
  },
];
const clickDetail = (row: TableRow) => {
  router.push({
    name: row.subcategory,
  });
};
</script>

<template>
  <el-table :data="data" border>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="大类" prop="category"></el-table-column>
    <el-table-column label="小类" prop="subcategoryCn"></el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="() => clickDetail(row)">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>
