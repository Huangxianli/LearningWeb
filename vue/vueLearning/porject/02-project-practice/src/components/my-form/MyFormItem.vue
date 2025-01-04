<template>
  <el-col :span="layout.inline ? 24 : 12" class="my-form-item">
    <el-form-item v-bind="$attrs" :prop="prop" ref="formItem" :rules="rules" size="mini">
      <el-tooltip :manual="true" effect="dark" :content="errorMessage" placement="top-end" v-model="showErrorTip"
        popper-class="form-item-error-tip">
        <div>
          <el-row :gutter="8">
            <el-col :span="layout.inline ? 3 : 6">
              <div class="my-form-item__label">

                <div>
                  <el-tooltip placement="top" effect="light" v-if="showLabelTipIcon">
                    <template slot="content">
                      {{ labelTipInfo }}
                    </template>
                    <span class="el-icon-warning-outline my-form-item__icon-tip"></span>
                  </el-tooltip>
                </div>

                <span class="my-form-item__required_icon" v-if="isRequired || required"></span>
                <!-- <div ref="formItemLabel" class="form-item-label-date"> -->
                <OverShow>
                  <slot name="label">
                    <div>{{ label }}</div>
                  </slot>
                </OverShow>
                <!-- </div> -->
              </div>
            </el-col>
            <el-col :span="layout.inline ? 21 : 18">
              <slot>
                <!-- <el-input /> -->
              </slot>
            </el-col>
          </el-row>
        </div>
      </el-tooltip>
    </el-form-item>
  </el-col>
</template>

<script>
import OverShow from '../OverShow.vue';
export default {
  components: {
    OverShow,
  },
  directives: {
    mutilOverShow: {
      inserted (el) {
        el.scrollHeight
        debugger
      },
      update () {
        debugger
      },
      componentUpdated () {
      },
      unbind () {
      }
    }
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      required: true
    },
    layout: {
      type: Object,
      required: false,
      default: () => ({
        inline: false,
      }),
    },
    // 该属性只是起到样式作用，对必填校验没有任何的影响
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: [Array, null],
      required: false,
      default: null,
      validator (value) {
        return value === null || value.every(rule => rule instanceof Object)
      }
    },
    showLabelTipIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    labelTipInfo: {
      type: String,
      required: false,
      default: '',
    }
  },
  data () {
    return {
      formItemLabel: null,
      timer: null,
      errorMessage: '',
      showErrorTip: false,
      timmer: null,
      isRequired: false,
      form: null,
    };
  },
  mounted () {
    this.form = this.getForm(['ElForm', 'MyElFrom']);
    if (this.form) {
      this.form.$on('validate', (prop, isValid, info) => {
        if (prop === this.prop) {
          this.errorMessage = !isValid && info;
          if (!isValid) {
            this.$nextTick(() => { this.showErrorTip = true });
            if (this.timer) {
              clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
              this.showErrorTip = false;
            }, 2000);
          }
        }
      })
    }
    this.isRequired = this.getRules().some(rule => rule.required);
    setTimeout(() => {
      // this.truncateText(this.$refs.formItemLabel, 2);
    }, 200);
    window.addEventListener('resize', this.sizeChange)
  },
  methods: {
    sizeChange () {
      // this.truncateText(this.$refs.formItemLabel, 2);
    },
    // 改写成自定义指令
    async truncateText (element, maxLines) {
      const lineHeight = 29;
      const maxHeight = lineHeight * maxLines;
      if (element.scrollHeight > maxHeight) {
        await this.$nextTick();
        element.style.maxHeight = `${maxHeight}px`;
        element.style.overflow = 'hidden';
        element.style.textOverflow = 'ellipsis';
        element.classList.add('form-item-label-date-over');
      } else {
        element.classList.remove('form-item-label-date-over');
      }
    },
    getForm (componentNames) {
      let parent = this.$parent || this.$root;
      let componentName = parent.$options.name;
      while (parent && !componentNames.includes(componentName)) {
        parent = parent.$parent;
        componentName = parent.$options.name;
      }
      return parent;
    },
    getRules () {
      let rules = this.rules || [];
      if (!rules.length) {
        rules = this.form?.$props.rules?.[this.prop] || [];
      }
      return rules;
    },
  },
}
</script>
<style scoped>
.el-form-item /deep/ .el-form-item__error {
  display: none;
}
</style>
<style>
.form-item-error-tip {
  border: 1px solid #F56C6C;
  background-color: #F56C6C !important;
}

.form-item-error-tip .popper__arrow {
  border-top-color: #F56C6C !important;
}

.form-item-error-tip .popper__arrow::after {
  border-top-color: #F56C6C !important;
}

.my-form-item__required_icon {
  color: #F56C6C;
  margin-right: 2px;
}

.my-form-item .el-form-item {
  margin-bottom: 4px;
}

.my-form-item .my-form-item__label {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;

}

.my-form-item__icon-tip {
  color: #F56C6C;
  margin-right: 4px;
  width: 18px;
}

.my-form-item__required_icon::after {
  display: inline-block;
  content: '*';
}

.form-item-label-date {
  overflow-wrap: wrap;
  word-break: break-all;
}

.form-item-label-date-over {
  position: relative;
  overflow: hidden;
}

.form-item-label-date-over::after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;

}
</style>