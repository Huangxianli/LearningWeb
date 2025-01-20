<template>
  <section>
    <div class="add-project-customer-info-title">
      客户信息
    </div>
    <el-form :model="formData" label-position="right" label-width="120px" ref="PLAPCustomerInfoRef">
      <template v-for="(formGroup, index) in formInfoTemp">
        <el-row :gutter="20" :key="index">
          <template v-for="item in formGroup">
            <el-col :key="item.label" v-if="item.inline" :span="24">
              <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules">
                <el-input v-if="item.type === 'input'" v-model="formData[item.prop]"
                  :placeholder="item.placeholder || '请输入'" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :key="item.label" v-else :span="6">
              <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules">
                <el-input v-if="item.type === 'input'" v-model="formData[item.prop]"
                  :placeholder="item.placeholder || '请输入'" clearable></el-input>
                <el-select v-else-if="item.type === 'select'" :placeholder="item.placeholder || '请选择'"
                  :multiple="item.multiple" v-model="formData[item.prop]" clearable>
                  <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                    :value="option.value"></el-option>
                </el-select>
                <el-date-picker v-else-if="item.type === 'dateTime'" type="datetime" placeholder="选择日期时间"
                  v-model="formData[item.prop]" clearable>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </template>

    </el-form>
  </section>
</template>

<script>
export default {
  data () {
    const formInfo = [
      {
        "label": "客户编号",
        "prop": "customerId",
        "type": "input",
        "rules": [{ "required": true, message: '请输入客户编号' }]
      },
      {
        "label": "客户名称",
        "prop": "customerName",
        "type": "input",
        "rules": [{ "required": true, message: '请输入客户名称' }]
      },
      {
        "label": "联系人",
        "prop": "contactPerson",
        "type": "input",
        "rules": [{ "required": true, message: '请输入联系人' }]
      },
      {
        "label": "联系方式",
        "prop": "contactInformation",
        "type": "input",
        "rules": [{ "required": true, message: '请输入联系方式' }]
      }
    ];
    const formInfoTemp =
      formInfo.reduce((pre, current, index) => {
        index;
        if (index % 4 === 0) {
          pre[parseInt(index / 4)] = [];
        }
        pre[parseInt(index / 4)].push(current);
        return pre;
      }, []);
    function initFormData () {
      const formData = {};
      formInfo.forEach(item => {
        formData[item.prop] = item.multiple ? [] : '';
      });
      return formData;
    }

    return {
      formData: initFormData(),
      formInfo: formInfo,
      formInfoTemp: formInfoTemp,
    }
  },
  methods: {
    validate () {
      return this.$refs.PLAPCustomerInfoRef.validate();
    }
  }
}
</script>

<style scoped>
.add-project-customer-info-title {
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 12px;
}

.el-select {
  width: 100%;
}

.el-date-editor {
  width: 100%;
}
</style>