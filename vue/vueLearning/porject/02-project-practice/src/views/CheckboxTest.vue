<template>
  <div>
    <el-checkbox v-model="checked1" @change="checkbox1Change">1</el-checkbox>
    <!-- 没有成组的时候，默认的是true/false -->
    <br />
    <label>
      <input type="checkbox" />
      1
    </label>
    <br />
    <el-checkbox-group v-model="checkgroup1" @change="checkgroupChange" :min="1">
      <!-- 注意label只在group中有用，而且v-model的值也不再是true/false -->
      <el-checkbox :label="1">1</el-checkbox>
      <el-checkbox :label="2">2</el-checkbox>
      <el-checkbox :label="3">3</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked1: false,
      checkgroup1: [],
    }
  },
  methods: {
    checkbox1Change () {
      console.log(this.checked1);
    },
    checkgroupChange () {
      console.log(this.checkgroup1)
    }
  }
}
</script>

<style></style>