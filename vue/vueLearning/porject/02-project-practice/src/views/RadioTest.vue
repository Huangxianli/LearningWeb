<template>
  <div>
    <el-radio label="1" v-model="radio1" @input="radio1Input">radio1</el-radio>
    <!-- el-radio返回的值是设置的label的值，并不是true/false -->
    <br />
    <label>
      <input type="radio" value="1" disabled />
      <span>radio1</span>
    </label>
    <br />
    <el-radio-group v-model="radio2" @input="groupInput">
      <el-radio :label="1">1</el-radio>
      <el-radio :label="2">2</el-radio>
      <el-radio :label="3">3</el-radio>
      <el-radio :label="4">4</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio1: '',
      radio2: 1,
    }
  },
  methods: {
    radio1Input () {
      console.log(this.radio1);
    },
    groupInput () {
      console.log(this.radio2);
    },
  },
}
</script>

<style></style>