<template>
  <div>
    <el-select size="mini" v-bind="$attrs" @visible-change="visibleChange" v-on="listeners">
      <template #empty>
        <div class="empty-option-box">
          <div v-if="store.isFetchData">
            <div v-if="store.status === REQUEST_STATUS.START" class="empty-option-box-content" v-loading="true">
            </div>
            <div v-else-if="store.status === REQUEST_STATUS.FAIL" class="empty-option-box-content">
              <div>数据请求失败，请重试</div>
              <el-button class="empty-option-box-retry" size="mini" @click="clickReload">重试</el-button>
            </div>
            <div v-else-if="store.status === REQUEST_STATUS.SUCCESS && (!store.data || store.data.length === 0)"
              class="empty-option-box-content">
              <div v-if="configName && configPath" class="empty-option-box-content-config">
                <span>暂无数据，请前往<a :href="configPath" target="_black">{{ configName
                    }}</a>配置；<br />如果已配置，请点击按钮重新加载</span>
                <el-button class="empty-option-box-retry" size="mini" @click="clickReload">重新加载</el-button>
              </div>
              <div v-else>
                暂无数据
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <template v-if="showOptions">
          <el-option v-for=" option in store.data" :key="option[keyMapKey]" :label="option[labelMapKey]"
            :value="option[valueMapKey]"></el-option>
        </template>

      </template>
    </el-select>
  </div>

</template>

<script>
import { REQUEST_STATUS } from '@/components/constant.js'
export default {
  inheritAttrs: false,
  props: {
    store: {
      default: () => ({ data: [] }),
      type: Object,
      required: true,
      validator: (value) => Array.isArray(value.data),
    },
    keyMapKey: {
      default: 'key',
      type: String,
    },
    labelMapKey: {
      default: 'label',
      type: String,
    },
    valueMapKey: {
      default: 'value',
      type: String,
    },
    configName: {
      default: '配置页面',
      type: String,
    },
    configPath: {
      default: '1',
      type: String,
    }
  },
  data () {
    return {
      showOptions: false,
      originVisibleChange: null,
      listeners: {},
    };
  },
  computed: {
    REQUEST_STATUS () {
      return REQUEST_STATUS;
    }
  },
  beforeCreate () {
    // debugger
    // if (this.$listeners['visible-change']) {
    //   this.originVisibleChange = this.$listeners['visible-change'];
    //   this.$listeners['visible-change'] = null;
    // }
  },

  created () {
    const eventsName = Object.keys(this.$listeners).filter(eventName => eventName !== 'visible-change');
    eventsName.forEach(eventName => {
      this.listeners[eventName] = this.$listeners[eventName]
    })
    // this.listeners = {
    //   ...this.$listeners,
    // }
    if (this.store.autoLoad) {
      this.store.load();
    }
  },
  methods: {
    clickReload () {
      this.store.load();
    },
    visibleChange (visible) {
      this.showOptions = visible;
      this.$emit('visible-change', visible);
      // if (this.originVisibleChange) {
      //   debugger
      //   this.originVisibleChange(visible);
      // }
    }
  }
}
</script>

<style>
.empty-option-box {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.empty-option-box-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
  padding: 10px;
}

.empty-option-box-content-config {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty-option-box-content-config span {
  text-align: center;
}

a {
  text-decoration: none;
  color: #409eff;
}

.empty-option-box-retry {
  margin-top: 12px;
}
</style>