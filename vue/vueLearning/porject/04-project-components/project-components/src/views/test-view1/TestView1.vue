<template>
  <section>
    <h1>测试table</h1>
    <div class="test-view-1-box">
      <div class="table-header-box">
        <el-button type="primary" size="mini" @click="addHandler">新增</el-button>
      </div>
      <XTableStore :store="store">
        <el-table-column show-overflow-tooltip type="index" label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip label="任务名称" prop="taskName"></el-table-column>
        <el-table-column show-overflow-tooltip label="所属项目" prop="project"></el-table-column>
        <el-table-column show-overflow-tooltip label="任务类型" prop="taskType"></el-table-column>
        <el-table-column show-overflow-tooltip label="所属里程碑" prop="milestone"></el-table-column>
        <el-table-column show-overflow-tooltip label="发布时间" prop="releaseTime"></el-table-column>
        <el-table-column label="操作" #default="{ row }">
          <template>
            <el-button type="text" link size="small" @click="editHandler(row)">编辑</el-button>
            <el-button type="text" link size="small" @click="showHandler(row)">查看</el-button>
            <!-- <el-button type="text" size="small">新增任务</el-button> -->
          </template>
        </el-table-column>
      </XTableStore>
    </div>
  </section>
</template>

<script>
import XTableStore from '@/components/XTableStore.vue';
import DialogContent from './DialogContent.vue';
import { UnallocatedTask } from "@/views/test-view1/test-view-1-store";

import { createDialogPromise } from '@/utils/createDialogPromise';
import { DIALOG_TYPE } from '@/constant/dialogType';

export default {
  components: {
    XTableStore
  },
  data () {
    return {
      store: {},
    };
  },
  created () {
    this.store = new UnallocatedTask();
  },
  methods: {
    editHandler (row) {
      createDialogPromise(DialogContent)({ id: row.id, dialogType: DIALOG_TYPE.EDIT }, { props: { title: '自定义的标题' } });
    },
    addHandler () {
      createDialogPromise(DialogContent)({ dialogType: DIALOG_TYPE.ADD }, { props: { title: '自定义的标题' } });
    },
    showHandler (row) {
      createDialogPromise(DialogContent)({ id: row.id, dialogType: DIALOG_TYPE.SHOW }, { props: { title: '自定义的标题' } });

    },
  }
}
</script>

<style scoped>
.test-view-1-box {
  border: 1px solid #000;
}

.table-header-box {
  margin-bottom: 12px;
}
</style>