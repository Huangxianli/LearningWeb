<template>
  <div>
    <el-row :gutter="8">
      <el-col class="label-class" :span="4" justify="end">姓名</el-col>
      <el-col :span="8">
        <el-input v-model="newName" size="mini"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="mini" @click="clickAdd">增加</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      newName: '',
    };
  },
  methods: {
    ...mapMutations('vuexTest1', {
      setNewName: 'setNewName',
      addNewName: 'addNewName',
    }),
    clickAdd () {
      this.setNewName({ newName: this.newName });
      this.addNewName();

    }
  }
}
</script>

<style>
.label-class {
  direction: rtl;
  height: 28px;
  line-height: 28px;
}
</style>