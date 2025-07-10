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
  <div class="practice-list">
    <el-table :data="tableData" border size="small">
      <el-table-column
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column label="练习模块">
        <template #default="{ row }">
          {{ row.meta.testInfo.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template #default="{ row }">
          <div class="opration_cell">
            <el-button
              text
              type="primary"
              size="small"
              @click="() => goToDeatailPage(row.name)"
            >
              详情
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.practice-list {
  padding: 10px;
}
.opration_cell {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
button.is-text {
  padding-right: 0;
  padding-left: 0;
  margin: 0;
}
</style>
