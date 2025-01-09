<template>
  <div class="dialog-footer-button">
    <el-button v-if="[allDialogType.ADD, allDialogType.CHANGE].includes(dialogType)" type="primary" size="mini"
      @click="$emit('clickConfim')">确定</el-button>
    <el-button v-if="[allDialogType.ADD, allDialogType.CHANGE].includes(dialogType)" size="mini"
      @click="$emit('clickCancel')">取消</el-button>
    <el-button v-if="[allDialogType.READ].includes(dialogType)" size="mini" @click="$emit('clickClose')">关闭</el-button>
  </div>
</template>

<script>
import { DIALOG_TYPE } from './constant';

export default {
  props: {
    dialogType: {
      default: DIALOG_TYPE.READ,
      type: String,
      required: false,
      validatot (value) {
        return Object.values(DIALOG_TYPE).includes(value);
      }
    },
    // showButton: {
    //   default: () => [DIALOG_TYPE.READ],
    //   type: Array,
    //   required: false,
    //   validatot (value) {
    //     return Object.values(DIALOG_TYPE).every(button => value.includes(button));
    //   }
    // }
  },
  computed: {
    allDialogType () {
      return DIALOG_TYPE
    }
  }
}
</script>

<style scoped>
.dialog-footer-button {
  text-align: center;
}
</style>