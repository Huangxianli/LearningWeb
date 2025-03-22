<template>
  <div class="page-container">
    <!-- 头部区域 -->
    <div class="header">
      <!-- 头部内容 -->
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
      <el-table height="100%" border stripe>
        <!-- 表格列配置 -->
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    height: 60px; // 头部固定高度
    flex-shrink: 0; // 防止头部被压缩
  }

  .table-container {
    flex: 1; // 占据剩余空间
    padding: 20px;
    box-sizing: border-box;

    :deep(.el-table) {
      height: 100%;
    }
  }
}
</style>