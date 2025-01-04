<template>
  <section class="test-view-3">
    <el-form :model="stopStore.filter" label-width="auto">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="projectName" label="项目名称">
            <el-input v-model="stopStore.filter.projectName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" size="mini" @click="stopStore.search()">搜索</el-button>
            <el-button size="mini">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <XTableStore :store="stopStore">
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <XTableColumn label="操作">
        <template #default="scoped">
          <XStartButton type="text" size="mini" @click="scoped.model.start()">启用</XStartButton>
          <el-button type="text" size="mini" @click="scoped.model.delete()">删除</el-button>
        </template>
      </XTableColumn>
    </XTableStore>
  </section>
</template>

<script>
import XTableStore from '@/components/XTableStore.vue';
import XTableColumn from '@/components/XTableColumn.vue';
import XStartButton from '@/components/XStartButton.vue';

import { StopStore } from './test-view-3-store';
export default {
  components: {
    XTableStore,
    XTableColumn,
    XStartButton,
  },
  data () {
    return {
      stopStore: new StopStore([]),
    }
  },
  created () {
    this.stopStore.setParams(
      { status: 'stop' }
    );
    this.stopStore.load([]);
  }
}
</script>

<style scoped>
.test-view-3 {
  border: 1px solid #000;
  margin-top: 12px;
}
</style>