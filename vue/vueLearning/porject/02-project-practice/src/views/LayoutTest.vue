<template>
  <div>
    <el-row class="mb12">
      <el-col :span="5"><div class="bgc h36"></div></el-col>
      <el-col :span="19"><div class="bgy h36"></div></el-col>
    </el-row>
    <el-row class="mb12" :gutter="8">
      <el-col :span="5"><div class="bgc h36"></div></el-col>
      <el-col :span="10"><div class="bgy h36"></div></el-col>
      <el-col :span="9"><div class="bgg h36"></div></el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :span="12" :offset="6"><div class="bgg h36"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.h36 {
  height: 36px;
}
.mb12 {
  margin-bottom: 12px;
}
.bgc {
  background-color: red;
}
.bgy {
  background-color: yellow;
}
.bgg {
  background-color: green;
}
</style>