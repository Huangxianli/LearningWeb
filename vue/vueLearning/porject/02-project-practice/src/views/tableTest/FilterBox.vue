<template>
  <div class="filter-box">
    <div class="filter-box__content">
      <el-input size="mini" placeholder="请输入"></el-input>
    </div>
    <div class="filter-box__bottom">
      <el-button size="mini" type="primary">筛选</el-button>
      <el-button size="mini">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.filter-box {
  margin-top: 12px;
  max-width: 200px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.filter-box__content {
  padding: 8px;
  border-bottom: 1px solid #ebeef5;
}

.filter-box__bottom {
  padding: 8px;
  display: flex;
  justify-content: space-between;
}
</style>