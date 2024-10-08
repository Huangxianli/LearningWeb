<template>
  <div>
    <h2>表单test</h2>
    <el-form :model="formData" ref="ruleForm" :rules="rules">
      <el-form-item v-for="{ prop, label, modelName, rules } in formItemsInfo" :key="prop" :label="label" :prop="prop"
        :rules="rules" :show-message="true" :status-icon="true" required>
        <template slot="label">
          名称1
        </template>
        <el-input v-model="formData[modelName]"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="clickSubmit">提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        age: '',
      },
      formItemsInfo: [
        {
          prop: 'name',
          label: '名称',
          modelName: 'name',
          // rules: [
          // { required: false, message: 'gsdfgsdg公司分公司答复', trigger: ['blur', 'change'] },
          // ],
        },
      ],
      rules: {
        name: [{
          // required: true,
        }, {
          validator () {
          }, trigger: 'blur'

        }]
      },
      showErrorTip: false,
      errorMessage: '',
      isTimeout: false,
      isLimitInsert: false,
    }
  },
  methods: {



    clickSubmit () {
      let validPass = false;
      this.$refs.ruleForm.validate(valid => {
        validPass = valid;
      });
      return validPass;
    },
  },
}

</script>


<style>
.error-tip-class {
  border: 1px solid red !important;
  color: red;
}

.error-tip-class.el-tooltip__popper .popper__arrow {
  border-top-color: red !important;
}

.hidden-valid-tip {
  display: none;
}
</style>