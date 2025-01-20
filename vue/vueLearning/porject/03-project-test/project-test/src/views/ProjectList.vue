<template>
  <MainContentBoxVue>
    <section class="project-list-head">
      <h3 class="project-list-title">项目列表</h3>
      <div>
        <el-button type="primary" @click="clickAddProjectBtn">新增</el-button>
        <el-button plain type="danger">停用</el-button>
        <el-button>已停用{{ 12 }}</el-button>
      </div>
    </section>
    <PLSearchFormVue />
    <PLTableVue @clickCell="clickCell" />
    <PLAddProjectDialog ref="PLAddProjectDialogRef" />
    <PLProjectProgressRecordDialog />
  </MainContentBoxVue>
</template>

<script>
import MainContentBoxVue from '@/components/MainContentBox.vue';
import PLSearchFormVue from './PLSearchForm.vue';
import PLTableVue from './PLTable.vue';
import PLAddProjectDialog from './PLAddProjectDialog.vue';
import PLProjectProgressRecordDialog from './PLProjectProgressRecordDialog.vue';

export default {
  components: {
    MainContentBoxVue,
    PLSearchFormVue,
    PLTableVue,
    PLAddProjectDialog,
    PLProjectProgressRecordDialog,
  },
  methods: {
    clickAddProjectBtn () {
      this.$refs.PLAddProjectDialogRef.openDialog(true);
    },
    clickCell (row, prop) {
      if (['projectNumber', 'projectName'].includes(prop)) {
        // 将详细信息传递进去
        this.$refs.PLAddProjectDialogRef.openDialog(true);

      }
    }
  }
}
</script>

<style scoped>
.project-list-head {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 12px;
}

.project-list-title {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  margin: 0 12px 0 0;
}
</style>