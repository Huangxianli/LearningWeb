<template>
  <section>
    <div class="add-project-deteil-title">
      项目详情
    </div>
    <el-form :model="formData" label-position="right" label-width="120px" ref="PLAPProjectDetailRef">
      <template>
        <el-row v-for="(formGroup, index) in formInfoTemp" :gutter="20" :key="index">
          <template v-for="item in formGroup">
            <el-col :key="item.prop" v-if="item.inline" :span="24">
              <template v-if="isEdit">
                <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules">
                  <el-input v-if="item.type === 'input'" v-model="formData[item.prop]"
                    :placeholder="item.placeholder || '请输入'" clearable></el-input>
                </el-form-item>
              </template>
              <template v-else>
                <span>{{ formData[item.prop] }}</span>
              </template>
            </el-col>
            <el-col :key="item.prop" v-else :span="6">
              <el-form-item :label="item.label" :prop="item.prop" :rules="item.rules">
                <template v-if="isEdit">
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
                </template>
                <template v-else>
                  <span>{{ formData[item.prop] }}</span>
                </template>
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
  props: {
    isEdit: {
      default: true
    },
  },
  data () {
    const formInfo = [
      {
        "label": "项目编号",
        "prop": "projectId",
        type: 'input',
        rules: [{
          required: true,
          message: '请填写项目编号',
        }],
      },
      {
        "label": "项目名称",
        "prop": "projectName",
        type: 'input',
        rules: [{
          required: true,
          message: '请填写项目名称',
        }],
      },
      {
        "label": "项目负责人",
        "prop": "projectLeader",
        type: 'select',
        options: setOptions(42, '项目负责人'),
        rules: [{
          required: true,
          message: '请选择项目负责人',
        }],
      },
      {
        "label": "项目进度",
        "prop": "projectProgress",
        type: 'input',
        rules: [{
          required: true,
          message: '请填写项目进度',
        }],
      },
      {
        "label": "计划开始时间",
        "prop": "plannedStartDate",
        type: 'dateTime',
        rules: [{
          required: true,
          message: '请选择计划开始时间',
        }],
      },
      {
        "label": "计划结束时间",
        "prop": "plannedEndDate",
        type: 'dateTime',
        rules: [{
          required: true,
          message: '请选择计划结束时间',
        }],
      },
      {
        "label": "项目参与人",
        "prop": "projectParticipants",
        type: 'select',
        multiple: true,
        options: setOptions(42, '项目参与人'),
        rules: [{
          required: true,
          message: '请选择项目参与人',
        }],
      },
      {
        "label": "项目状态",
        "prop": "projectStatus",
        type: 'select',
        options: setOptions(4, '项目状态'),

        rules: [{
          required: true,
          message: '请选择项目状态',
        }],
      },
      {
        "label": "提交人",
        "prop": "submitter",
        type: 'select',
        options: setOptions(345, '提交人'),
        rules: [{
          required: true,
          message: '请选择项目提交人',
        }],
      },
      {
        "label": "项目类型",
        "prop": "projectType",
        type: 'input',
        rules: [{
          required: true,
          message: '请填写项目类型',
        }],
      },
      {
        "label": "项目来源",
        "prop": "projectSource",
        type: 'input',
        rules: [{
          required: true,
          message: '请填项目来源',
        }],
      },
      {
        "label": "是否立项",
        "prop": "isApproved",
        type: 'select',
        options: setOptions(2, '是否立项'),
        rules: [{
          required: true,
          message: '请选择是否立项',
        }],
      },
      {
        "label": "项目金额",
        "prop": "projectAmount",
        type: 'input',
        rules: [{
          required: true,
          message: '请填写项目金额',
        }],
      },
      {
        "label": "利润目标",
        "prop": "profitTarget",
        type: 'input',
        rules: [{
          required: true,
          message: '请填写利润目标',
        }],
      },
      {
        "label": "项目工期",
        "prop": "projectDuration",
        type: 'input',
        placehodler: '天',
        rules: [],
      },
      {
        "label": "项目经理",
        "prop": "projectManager",
        type: 'select',
        options: setOptions(221, '项目经理'),
        rules: [],
      },
      {
        "label": "项目地址",
        "prop": "projectAddress",
        type: 'input',
        rules: [],
        inline: true,
      },
      {
        "label": "备注",
        "prop": "remarks",
        type: 'input',
        placehodler: '获奖信息等',
        rules: [],
        inline: true,
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
    function setOptions (length, labelName) {
      const options = [];
      for (let i = 0; i < length; i++) {
        const option = {
          label: labelName + i,
          value: i
        };
        options.push(option);
      }
      return options;
    }
    return {
      formData: initFormData(),
      formInfo: formInfo,
      formInfoTemp: formInfoTemp,
    }
  },
  computed: {

  },
  methods: {
    validate () {
      return this.$refs.PLAPProjectDetailRef.validate();
    }
  }
}
</script>

<style scoped>
.add-project-deteil-title {
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