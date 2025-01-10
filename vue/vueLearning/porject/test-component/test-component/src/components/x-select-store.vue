<template>
  <div>
    <el-select size="mini" v-bind="$attrs" v-on="$listeners">
      <template #empty>
        <div class="empty-option-box">
          <div v-if="store.status === REQUEST_STATUS.START" class="empty-option-box-content" v-loading="true">
          </div>
          <div v-else-if="store.status === REQUEST_STATUS.FAIL" class="empty-option-box-content">
            <div>数据请求失败，请重试</div>
            <el-button class="empty-option-box-retry" size="mini" @click="clickReload">重试</el-button>
          </div>
          <div v-else class="empty-option-box-content">暂无数据</div>
        </div>
      </template>
      <template #default>
        <el-option v-for=" option in store.data" :key="option[keyMapKey]" :label="option[labelMapKey]"
          :value="option[valueMapKey]"></el-option>
      </template>
    </el-select>
  </div>

</template>

<script>
import { REQUEST_STATUS } from '@/components/constant.js'
export default {
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
    }
  },
  computed: {
    REQUEST_STATUS () {
      return REQUEST_STATUS;
    }
  },

  created () {
    if (this.store.autoLoad) {
      this.store.load();
    }
  },
  methods: {
    clickReload () {
      this.store.load();
    }
  }
}
</script>

<style>
.empty-option-box {
  height: 100px;
}

.empty-option-loading-box {
  height: 100%;
}

.empty-option-box-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
}

.empty-option-box-retry {
  margin-top: 12px;
}
</style>