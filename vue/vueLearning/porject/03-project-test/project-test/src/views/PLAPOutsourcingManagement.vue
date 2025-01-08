<template>
  <section>
    <div class="outsourcing-management-title">外委管理</div>
    <el-form :model="formData" ref="PLAPOutsourcingManagementRef">
      <el-form-item label="是否审批外委计划" prop="isApproval" :rules="[{ required: true }]">
        <el-radio-group v-model="formData.isApproval">
          <el-radio label="Y">是</el-radio>
          <el-radio label="N">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </section>

</template>

<script>
export default {
  data () {
    return {
      formData: {
        isApproval: "Y"
      }
    }
  },
  methods: {
    validate () {
      return this.$refs.PLAPOutsourcingManagementRef.validate();
    }
  }
}
</script>

<style scoped>
.outsourcing-management-title {
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 12px;
}
</style>