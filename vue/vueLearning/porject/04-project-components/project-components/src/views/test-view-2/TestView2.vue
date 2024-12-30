<template>
  <section class="test-view-2">
    <div class="table-header-button-box">
      <el-button type="primary" size="mini" @click="addHanler">新增</el-button>
      <el-button size="mini" type="danger" plain>停用</el-button>
      <el-button size="mini">已停用</el-button>
    </div>
    <!-- <el-form label-width="auto">
      <el-form-item label="项目编码">
      </el-form-item>
      <el-form-item label="项目名称">
      </el-form-item>
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini">搜索</el-button>
        <el-button size="mini">重置</el-button>
      </el-form-item>
    </el-form> -->
    <XTableStore :store="projectStore">
      <el-table-column type="index" align="center" label="序号" show-overflow-tooltip></el-table-column>
      <el-table-column label="项目编号" prop="projectNumber" show-overflow-tooltip></el-table-column>
      <el-table-column label="项目名称" prop="projectName" show-overflow-tooltip></el-table-column>
      <el-table-column label="项目金额" prop="projectAmount" show-overflow-tooltip></el-table-column>
      <el-table-column label="项目进度" prop="projectProgress" show-overflow-tooltip></el-table-column>
      <el-table-column label="合同" prop="contract" show-overflow-tooltip></el-table-column>
      <el-table-column label="收款" prop="receipt" show-overflow-tooltip></el-table-column>
      <el-table-column label="开票（收/付）" prop="invoice" show-overflow-tooltip></el-table-column>
      <el-table-column label="立项" prop="projectApproval" show-overflow-tooltip></el-table-column>
      <el-table-column label="开工单" prop="workOrder" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </XTableStore>
  </section>
</template>

<script>
/*
    label: "项目编号",
    prop: "projectNumber",
    label: "项目名称",
    prop: "projectName",
    label: "项目金额",
    prop: "projectAmount",
    label: "项目进度",
    prop: "projectProgress",
    label: "合同",
    prop: "contract",
    label: "收款",
    prop: "receipt",
    label: "开票（收/付）",
    prop: "invoice",
    label: "付款",
    prop: "payment",
    label： "立项",
    prop: "projectApproval",
    label: "开工单",
    prop: "workOrder",
    label: "项目阶段",
    prop: "projectPhase",
    label: "是否外委",
    prop: "isOutsourced",
    label: "外委申请",
    prop: "outsourcingApplication",
    label: "外委采购",
    prop: "outsourcingProcurement",
    label: "外委详情",
    prop: "outsourcingDetails",
    label: "外委总费用（万元）",
    prop: "outsourcingTotalCost(tenThousandYuan)",
    label: "项目任务进度",
    prop: "projectTaskProgress",
    label: "项目人员架构",
    prop: "projectPersonnelStructure",
    label: "项目产值",
    prop: "projectOutput",
    label: "已申报产值",
    prop: "declaredOutput",
    label: "请款申请",
    prop: "fundRequestApplication",
    label: "项目资料柜",
    prop: "projectFileCabinet",
 */
import XTableStore from '@/components/XTableStore.vue';
import ProjectDialogContent from './ProjectDialogContent.vue';
import { ProjectStore } from './project-store';
import { createDialogPromise } from '@/utils/createDialogPromise';
export default {
  components: {
    XTableStore
  },
  data () {
    return {
      projectStore: new ProjectStore([]),
    }
  },
  created () {
    this.projectStore.load({})
  },
  methods: {
    addHanler () {
      createDialogPromise(ProjectDialogContent)({}, {
        props: {
          title: '新增项目'
        }
      })
    }
  }
}
</script>

<style scoped>
.test-view-2 {
  margin-top: 12px;
  border: 1px solid #000;
}

.table-header-button-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>