<template>
  <MainContentBoxVue>
    <h2 class="personal-dashbord-title">我的任务</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="进行中任务" name="ongoingTasks">
        <PDTaskTableVue :allData="personalDashboardData.ongoingTasks" tabKey="" />
      </el-tab-pane>
      <el-tab-pane label="已完成任务" name="completedTasks"
        :allData="personalDashboardData.completedTasks">配置管理</el-tab-pane>
      <el-tab-pane label="全部任务" name="allTasks" :allData="personalDashboardData.allTasks">角色管理</el-tab-pane>
    </el-tabs>
  </MainContentBoxVue>
</template>

<script>
import MainContentBoxVue from '@/components/MainContentBox.vue';
import PDTaskTableVue from './PDTaskTable.vue';

import personalDashboardData from '@/mockData/personal-dashboard';
export default {
  components: {
    MainContentBoxVue,
    PDTaskTableVue,
  },
  data () {
    return {
      activeName: 'ongoingTasks',
      personalDashboardData: personalDashboardData,
    };
  },
  methods: {
    handleClick () {

    },
  }
}
</script>

<style>
.personal-dashbord-title {
  font-size: 18px;
  height: 20px;
  line-height: 20px;
  margin: 12px 0 20px 0;
}
</style>