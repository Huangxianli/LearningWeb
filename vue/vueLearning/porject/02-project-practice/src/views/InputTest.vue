<template>
  <div>
    <el-row>
      <label>
        <el-col :span="3">
          test
        </el-col>
        <el-col :span="6">
          <el-input v-model="input1" placeholder="请先输入"></el-input>
        </el-col>
      </label>
    </el-row>
    <el-row>
      <input type="text" readonly>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input1: '',
    }
  }
}
</script>

<style></style>