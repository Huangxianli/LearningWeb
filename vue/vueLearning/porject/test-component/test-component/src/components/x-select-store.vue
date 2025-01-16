<template>
  <div>
    <el-select size="mini" :popper-class="{ 'x-store-select-option': needDestoryOption }" v-bind="$attrs"
      @visible-change="visibleChange" v-on="listeners">
      <template #empty>
        <div class="empty-option-box">
          <div v-if="store.isFetchData" v-loading="store.status === REQUEST_STATUS.START">
            <!-- <div v-if="store.status === REQUEST_STATUS.START" class="empty-option-box-content" v-loading="true">
            </div> -->

            <div v-if="store.status === REQUEST_STATUS.SUCCESS && (!store.data || !store.data.length)"
              class="empty-option-box-content">
              <div v-if="configName && configPath" class="empty-option-box-content-config">
                <span>暂无数据，请前往<a :href="configPath" target="_black">{{ configName
                    }}</a>配置；<br />如果已配置，请点击按钮重新获取</span>
                <el-button class="empty-option-box-retry" size="mini" @click="clickReload">重新获取</el-button>
              </div>
              <div v-else>
                暂无数据
              </div>
            </div>
            <div v-else-if="store.status === REQUEST_STATUS.FAIL" class="empty-option-box-content">
              <div>加载失败，请重试</div>
              <el-button class="empty-option-box-retry" size="mini" @click="clickReload">重试</el-button>
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <!-- <template v-if="showOptions"> -->
        <div v-infinite-scroll="store.load.bind(store)"
          :infinite-scroll-disabled="!store.isMasonryLayout || (store.total === store.data.length && store.total !== 0) || [REQUEST_STATUS.START, REQUEST_STATUS.FAIL].includes(store.status)">
          <el-option v-for=" (option, index) in store.data" :key="`${option[keyMapKey]}-${index}`"
            :label="option[labelMapKey]" :value="option[valueMapKey]">
          </el-option>
          <div class="infinite-loading" v-if="store.status === REQUEST_STATUS.START && store.isMasonryLayout">加载中
          </div>
          <div v-if="store.status === REQUEST_STATUS.FAIL" class="infinite-loading">
            <div>加载失败，请重试</div>
            <el-button class="empty-option-box-retry" size="mini" @click="store.load.bind(store)">重试</el-button>
          </div>
        </div>
        <!-- </template> -->
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
    },
    needDestoryOption: {
      default: true,
      type: Boolean,
    }
  },
  data () {
    return {
      // showOptions: false, // 因为 element ui 中 el-select 的下拉框是在第一次创建之后就不会销毁的，如果一个表格中有很多的 el-select ，每个都打开一次，那么会导致 dom 过多，页面会卡顿，展开下拉的时候为true，收起下拉的时候为false
      originVisibleChange: null,
      listeners: {},
    };
  },
  computed: {
    REQUEST_STATUS () {
      return REQUEST_STATUS;
    }
  },

  created () {
    const eventsName = Object.keys(this.$listeners).filter(eventName => eventName !== 'visible-change');
    eventsName.forEach(eventName => {
      this.listeners[eventName] = this.$listeners[eventName];
    });
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
      if (!visible && this.needDestoryOption) {
        const options = document.getElementsByClassName('x-store-select-option');
        const length = options.length ?? 0;
        for (let i = 0; i < length; i++) {
          options[i].remove();
        }
      }
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

.infinite-loading {
  display: flex;
  justify-content: center;
  color: #999;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>