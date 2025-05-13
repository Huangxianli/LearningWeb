<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const routes = router.getRoutes();
const practiceRoute = routes.find((route) => route.name === 'practice');
const tableData = practiceRoute?.children ?? [];

const goToDeatailPage = (routeName: string) => {
  router.push({
    name: routeName,
  });
};
</script>

<template>
  <el-table :data="tableData" border size="small">
    <el-table-column type="index"></el-table-column>
    <el-table-column label="模块">
      <template #default="{ row }">
        {{ row.meta.testInfo.name }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100px">
      <template #default="{ row }">
        <el-button
          text
          type="primary"
          size="small"
          @click="() => goToDeatailPage(row.name)"
          >详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>
