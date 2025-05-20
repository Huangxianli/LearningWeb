<script setup lang="ts">
import { ref } from 'vue';
const OPTION_STATE = {
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;
type OptionState = (typeof OPTION_STATE)[keyof typeof OPTION_STATE];
const props = defineProps<{ status: OptionState }>();

const checkData = ref([]);
</script>

<template>
  选中的值：{{ checkData.join() }}
  <el-checkbox-group v-model="checkData">
    <span
      v-if="props.status === OPTION_STATE.LOADING"
      class="my_checkbox_is_loading"
      >加载中</span
    >
    <span class="my_checkbox_is_error">
      加载失败，请<el-button size="small" text type="primary">重试</el-button>
    </span>
    <el-checkbox label="显示1" value="1"></el-checkbox>
    <el-checkbox label="显示2" value="2"></el-checkbox>
    <el-checkbox label="显示3hkjh khk kh" value="3"></el-checkbox>
    <el-checkbox label="显示4" value="4"></el-checkbox>
    <el-checkbox label="显示5" value="5"></el-checkbox>
    <el-checkbox label="显示5" value="6"></el-checkbox>
    <el-checkbox label="显示5" value="7"></el-checkbox>
    <el-checkbox label="显示5" value="8"></el-checkbox>
    <el-checkbox label="显示5" value="9"></el-checkbox>
    <el-checkbox label="显示5" value="10"></el-checkbox>
    <el-checkbox label="显示5" value="11"></el-checkbox>
    <el-checkbox label="显示5" value="12"></el-checkbox>
  </el-checkbox-group>
</template>

<style scoped lang="less">
.my_checkbox_is_loading,
.my_checkbox_is_error {
  width: 100%;
  font-size: 14px;
  height: 14px;
  line-height: 14px;
}
</style>
