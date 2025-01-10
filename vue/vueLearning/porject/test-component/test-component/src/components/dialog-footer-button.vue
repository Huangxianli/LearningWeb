<template>
  <div class="dialog-footer-button" id="self_promise_dialog_button_component">
    <el-button v-if="[allDialogType.ADD, allDialogType.CHANGE].includes(dialogType)" type="primary" size="mini"
      @click="$emit('clickConfirm')">确定</el-button>
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
  },
  mounted () {
    const self_dialog_footer = document.getElementById('self_promise_dialog_footer');
    const self_promise_dialog_button_component = document.getElementById('self_promise_dialog_button_component');
    if (self_dialog_footer && self_promise_dialog_button_component) {
      self_dialog_footer.appendChild(self_promise_dialog_button_component);
    }
    ['clickConfirm', 'clickCancel', 'clickClose'].forEach(eventName => {
      this.bindEvent(eventName)
    });
  },

  beforeDestroy () {
    ['clickClose', 'clickConfirm', 'clickCancel'].forEach(eventName => {
      this.$parent.$off(eventName)
    })
  },

  methods: {
    bindEvent (eventName) {
      if (!this.$listeners[eventName]) {
        this.$on(eventName, function () {
          this.$parent.$emit(eventName);
        });
      }
    }
  }
}
</script>

<style scoped>
.dialog-footer-button {
  text-align: center;
}
</style>