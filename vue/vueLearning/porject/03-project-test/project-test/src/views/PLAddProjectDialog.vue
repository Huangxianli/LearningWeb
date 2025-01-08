<template>
  <el-dialog class="add-project-dialog" :visible.sync="showDialog" title="新增项目" width="1590px" top="15px">
    <template v-if="showDialog">
      <el-form :model="projectTemplateForm" ref="projectTemplateFormRef" destroy-on-close>
        <el-form-item :rules="[{ required: isEdit, message: '请选择项目模板' }]" label="项目阶段模板" prop="template">
          <template v-if="isEdit">
            <el-select v-model="projectTemplateForm.template">
              <el-option label="科技类项目板块" value="1"></el-option>
              <el-option label="外委项目模板" value="2"></el-option>
              <el-option label="信息化项目模板" value="3"></el-option>
            </el-select>
          </template>
          <template v-else>
            <span>{{ [, '科技类项目板块', '外委项目模板', '信息化项目模板'][projectTemplateForm.template] }}</span>
          </template>
        </el-form-item>
      </el-form>
      <PLAPProjectDetail ref="PLAPProjectDetailRef" :isEdit="isEdit" />
      <PLAPCustomerInfo ref="PLAPCustomerInfoRef" :isEdit="isEdit" />
      <PLAPProjectPhase ref="PLAPProjectPhaseRef" :isEdit="isEdit" />
      <PLAPOutsourcingManagement ref="PLAPOutsourcingManagementRef" :isEdit="isEdit" />
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="clickConfirm">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import PLAPCustomerInfo from './PLAPCustomerInfo.vue';
import PLAPOutsourcingManagement from './PLAPOutsourcingManagement.vue';
import PLAPProjectDetail from './PLAPProjectDetail.vue';
import PLAPProjectPhase from './PLAPProjectPhase.vue';
export default {
  components: {
    // MyFormVue,
    PLAPProjectDetail,
    PLAPCustomerInfo,
    PLAPOutsourcingManagement,
    PLAPProjectPhase,
  },
  data () {
    return {
      showDialog: false,
      projectTemplateForm: {
        template: '1',
      },
      projectDetailForm: {},
      model: {},
      isEdit: false,
    };
  },
  methods: {
    openDialog (isEdit) {
      this.isEdit = isEdit;
      this.showDialog = true;
    },
    async clickConfirm () {
      Promise.all([
        this.$refs.projectTemplateFormRef.validate(),
        this.$refs.PLAPProjectDetailRef.validate(),
        this.$refs.PLAPCustomerInfoRef.validate(),
        this.$refs.PLAPProjectPhaseRef.validate(),
        this.$refs.PLAPOutsourcingManagementRef.validate(),
      ]).then(() => {
      }).catch(() => {
        this.$message({
          message: '请完善必填信息',
          type: 'error'
        })
      });

    }
  }
}
</script>

<style scoped>
.el-dialog__wrapper /deep/.el-dialog__body {
  max-height: calc(100vh - 250px);
  min-height: 300px;
  overflow: auto;
}

.add-project-deteil-title {
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  font-weight: 400;
  color: #000000;
}
</style>