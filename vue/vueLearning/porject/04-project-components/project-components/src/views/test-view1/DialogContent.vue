<template>
  <el-form :model="model.formData" label-width="auto" v-loading="model.status === REQUEST_STATUS.LOADING">
    <el-form-item label="123123" prop="taskType">
      <!-- <el-input v-model="model.formData.taskType" /> -->
      <span v-if="dialogType === DIALOG_TYPE.SHOW">{{ model.formData.taskType }}</span>
      <XSelectStore v-else v-model="model.formData.taskType" :store="taskTypeStore" id="id" label="label"
        optionValue="value" />
    </el-form-item>
    <el-form-item label="123123">
      <XRadioSrtore v-model="model.formData.isRelatedProject" :store="isRelatedProjectStore" id="id" label="label"
        optionValue="value" />
    </el-form-item>
    <el-form-item label="123123">
    </el-form-item>
    <el-form-item label="123123">
    </el-form-item>
    <el-form-item label="123123">
    </el-form-item>
    <el-form-item label="123123">
    </el-form-item>
    <div class="dialog-el-form-button">
      <el-button type="primary" size="mini" @click="confirmHandler">确定</el-button>
      <el-button size="mini" @click="$emit('cancel')">取消</el-button>
    </div>
  </el-form>

</template>

<script>
import { TaskModel, TaskTypeStore, TsRelatedProjectStore } from './test-view-1-store';
import { REQUEST_STATUS } from '@/constant/requestStatus';
import { DIALOG_TYPE } from '@/constant/dialogType';

import XSelectStore from '@/components/XSelectStore.vue';
import XRadioSrtore from '@/components/XRadioSrtore.vue'
export default {
  /* 
  taskType
isRelatedProject
project
milestone
taskName
taskDescription
taskDepartment
taskOwner
taskStartTime
taskDueTime
outputValue

taskType -> 任务类型
isRelatedProject -> 是否关联项目
project -> 所属项目
milestone -> 所在里程碑
taskName -> 任务名称
taskDescription -> 任务描述
taskOwnerDepartment -> 任务负责人部门
taskOwner -> 任务负责人
taskStartTime -> 任务开始时间
taskDueTime -> 任务截止时间
outputValue -> 产值
*/
  components: {
    XSelectStore,
    XRadioSrtore,
  },
  props: {
    rowId: {
      type: [String, Number],
      default: '',
    },
    dialogType: {
      type: String,
      deafault: DIALOG_TYPE.ADD,
      validator: value => Object.values(DIALOG_TYPE).includes(value)
    }
  },
  data () {
    return {
      model: new TaskModel({}),
      taskTypeStore: new TaskTypeStore([]),
      isRelatedProjectStore: new TsRelatedProjectStore([]),
      taskTypeOption: [
        { id: 0, label: '0', value: '0' },
        { id: 1, label: '1', value: '1' },
        { id: 2, label: '2', value: '2' },
      ],
      isRelatedProjectOption: [
        { id: 0, label: 'Y', value: '是' },
        { id: 1, label: 'N', value: '否' },
      ],
    }
  },
  computed: {
    REQUEST_STATUS () {
      return REQUEST_STATUS;
    },
    DIALOG_TYPE () {
      return DIALOG_TYPE;
    }
  },
  created () {
    if (this.dialogType === DIALOG_TYPE.ADD) {
      this.taskTypeStore.load({}, this.taskTypeOption);
      this.isRelatedProjectStore.setDefaultOptions(this.isRelatedProjectOption);
    } else if (this.dialogType === DIALOG_TYPE.EDIT) {
      this.model.load({ id: this.rowId })
      this.taskTypeStore.load({}, this.taskTypeOption);
      this.isRelatedProjectStore.setDefaultOptions(this.isRelatedProjectOption);
    } else {
      this.model.load({ id: this.rowId })
    }
  },
  methods: {
    async confirmHandler () {
      await this.model.save();
      this.$emit('confirm');

    }
  }
}
</script>

<style scoped>
.dialog-el-form-button {
  text-align: center;
}
</style>