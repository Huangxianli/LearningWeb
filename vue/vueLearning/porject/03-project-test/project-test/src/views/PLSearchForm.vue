<template>
  <section class="serch-form-box">
    <el-row class="serch-form" :gutter="12">
      <el-form :model="formData" ref="searchForm" size="mini" label-position="right" label-width="80px">
        <el-col :span="8">
          <el-form-item label="年度" prop="year">
            <el-date-picker v-model="formData.year" type="year" placeholder="请选择" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编码" prop="projectNumber">
            <el-input v-model="formData.projectNumber" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目类型" prop="projectType">
            <el-select v-model="formData.projectType" clearable>
              <el-option label="项目类型1" value="1"></el-option>
              <el-option label="项目类型2" value="2"></el-option>
              <el-option label="项目类型3" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="search-table-button">
      <el-button type="primary" size="mini" @click="clickSearch">搜索</el-button>
      <el-button size="mini" @click="clickClear">清除</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        year: '',
        projectNumber: '',
        projectType: '',
      },

    };
  },
  methods: {
    clickSearch () {
      const formProps = Object.keys(this.formData);
      const haveNoData = formProps.every(prop => !this.formData[prop]);
      if (haveNoData) {
        this.$message({
          message: '请至少选择或输入一项搜索条件',
          type: 'warning'
        });
        return;
      }
      this.$emit('clickSearch', this.formData);
    },
    clickClear () {
      this.$refs.searchForm.resetFields();
      this.$emit('clickClear');
    }
  }

}
</script>

<style scoped>
.serch-form-box {
  display: flex;
  flex-flow: row nowrap;
}

.serch-form {
  flex-grow: 1;
}

.serch-form /deep/ .el-date-editor.el-input {
  width: 100%;
}

.serch-form /deep/ .el-select.el-select--mini {
  width: 100%;
}

.search-table-button {
  flex-shrink: 0;
  width: 135px;
  margin-left: 12px;
}
</style>