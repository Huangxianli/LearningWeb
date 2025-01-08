<template>
  <el-dialog title="提交任务" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <el-form :rules="rules" ref="formRef" class="commit-dialog-form" :model="formData" label-position="right"
      label-width="130px">
      <el-form-item required label="实际完成事件" prop="actualCompletionTime">
        <el-date-picker v-model="formData.actualCompletionTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item required label="实际完成工时" prop="actualCompletionHours">
        <el-input type="number" v-model="formData.actualCompletionHours" />
      </el-form-item>
      <el-form-item required label="备注" prop="remarks">
        <el-input type="textarea" v-model="formData.remarks" />
      </el-form-item>
      <el-form-item label="附件" prop="attachments">
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="clickConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      formData: {
        actualCompletionTime: '',
        actualCompletionHours: '',
        remarks: '',
        attachments: {},

      },
      rules: {
        actualCompletionTime: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        actualCompletionHours: [
          { required: true, message: '输入完成工时', trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '请选输入备注', trigger: ['change', 'blur'] }
        ],
      }
    };
  },
  methods: {
    openDialog () {
      this.dialogVisible = true;
    },
    handleClose () {
      this.dialogVisible = false;
    },
    clickConfirm () {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.dialogVisible = false;
        }
      })
    },
  },
}
</script>

<style scoped>
.commit-dialog-form /deep/.el-input {
  width: 100% !important;
}
</style>