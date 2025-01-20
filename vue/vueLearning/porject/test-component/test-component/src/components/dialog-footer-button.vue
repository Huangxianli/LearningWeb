<template>
  <div class="dialog-footer-button" id="self_promise_dialog_button_component">
    <slot name="confirmBtn" v-if="[allDialogType.ADD, allDialogType.CHANGE].includes(dialogType)">
      <el-button type="primary" size="mini" @click="clickBtn('clickConfirm')">确定</el-button>
    </slot>
    <slot name="cancelBtn" v-if="[allDialogType.ADD, allDialogType.CHANGE].includes(dialogType)">
      <el-button size="mini" @click="clickBtn('clickCancel')">取消</el-button>
    </slot>
    <slot name="closeBtn" v-if="[allDialogType.READ].includes(dialogType)">
      <el-button size="mini" @click="clickBtn('clickClose')">关闭</el-button>
    </slot>
    <slot name="otherBtn"></slot>
  </div>
</template>

<script>
import { TrackOpTypes } from 'vue';
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
    beforeConfirm: {
      type: Function,
      default: () => ({
        close: true,
        data: undefined,
      }),
    },
    beforeCancel: {
      type: Function,
      default: () => ({
        close: true,
        data: {},
      }),
    },
    beforeColse: {
      type: Function,
      default: () => ({
        close: true,
        data: undefined,
      }),
    }
  },
  computed: {
    allDialogType () {
      return DIALOG_TYPE
    },
  },
  mounted () {
    this.moveBtnToFooterSlot();
    this.bindEvent(['clickConfirm', 'clickCancel', 'clickClose'], true);
  },

  beforeDestroy () {
    this.bindEvent(['clickConfirm', 'clickCancel', 'clickClose'], false);
  },

  methods: {
    async clickBtn (eventName) {
      const eventMap = {
        clickConfirm: this.beforeConfirm,
        clickCancel: this.beforeCancel,
        clickClose: this.beforeColse
      };
      const info = eventMap[eventName] ? await eventMap[eventName]() : { close: true, data: undefined };
      if (info.close) {
        this.$emit(eventName, info.data);

      }
    },
    moveBtnToFooterSlot () {
      const self_dialog_footer = document.getElementById('self_promise_dialog_footer'); // dialog 组件的 slot footer 对应的 dom
      const self_promise_dialog_button_component = document.getElementById('self_promise_dialog_button_component'); // 
      if (self_dialog_footer && self_promise_dialog_button_component) {
        self_dialog_footer.appendChild(self_promise_dialog_button_component);
      }
    },

    bindEvent (eventNames, isOn) {
      for (let component = this; component && component.$options.componentName !== 'self_promise_dialog'; component = component.$parent) {
        eventNames.forEach(eventName => {
          if (isOn) {
            component.$on(eventName, function (data) {
              // a.$emit 的事件会在 a.$on 里面被捕捉到，
              component.$parent.$emit(eventName, data);
            });
          } else {
            component.$off(eventName);
          }
        })
      }
    },
  }
}
</script>

<style scoped>
.dialog-footer-button {
  text-align: center;
}
</style>