<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  useTableFilterPiniaTestStore,
  SEX_LABEL_MAP,
  SEX_OPTIONS,
} from '@/stores/tableFilterPiniaTest';
import type { FilterForm } from '@/stores/tableFilterPiniaTest';
import { ref, computed } from 'vue';
import { trackRefValue } from '../../../../../../vue3源码粗写/2024vue3-lesson-master/packages/reactivity/src/ref';
const tableFilterPiniaTestStore = useTableFilterPiniaTestStore();
const { setFilterForm, setFilterList, setFilterTableData, setIsFilter } = tableFilterPiniaTestStore;
const { tableFilterData, filterList, filterForm, isFilter } =
  storeToRefs(tableFilterPiniaTestStore);

const formData = ref<FilterForm>({
  name: undefined,
  age: undefined,
  sex: undefined,
});

formData.value = {
  ...formData.value,
  ...filterForm.value,
};

const filterBtnActive = computed(() =>
  (Object.keys(formData.value) as (keyof FilterForm)[]).some(
    (item) => formData.value[item] || formData.value[item] === 0,
  ),
);

const clickFilterBtn = () => {
  setFilterForm(formData.value);
  setFilterList();
  setFilterTableData();
  setIsFilter(true);
};

const clickCleanFilterBtn = () => {
  setFilterForm({});
  setFilterList();
  setFilterTableData();
  setIsFilter(false);
  formData.value = {};
};
</script>

<template>
  <div>
    <form @submit.prevent>
      <div class="form-row">
        <label class="label-width" for="name" clearable>姓名</label>
        <input class="form-item-width" id="name" v-model="formData.name" type="text" />
      </div>
      <div class="form-row">
        <label class="label-width" for="age">年龄</label>
        <input class="form-item-width" id="name" v-model="formData.age" type="text" />
      </div>
      <div class="form-row">
        <label class="label-width" for="sex">性别</label>
        <select class="form-item-width" name="" v-model="formData.sex" id="sex">
          <option v-for="labelItem in SEX_OPTIONS" :value="labelItem.value" :key="labelItem.value">
            {{ labelItem.label }}
          </option>
        </select>
      </div>
      <div class="form-btn">
        <button @click="clickFilterBtn" :disabled="!filterBtnActive">过滤</button>
        <button @click="clickCleanFilterBtn" :disabled="!isFilter">清空筛选</button>
      </div>
    </form>
  </div>
  <div class="filter-info">
    <template v-if="filterList.length">
      <span class="filter-info-item" v-for="filiterItem in filterList" :key="filiterItem.id">
        {{ filiterItem.keyName }}：{{ filiterItem.value }}
      </span>
    </template>
  </div>
  <table class="table-filter-test">
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="tableFilterData.length">
        <tr v-for="row in tableFilterData" :key="row.id">
          <td>{{ row.name }}</td>
          <td>{{ row.age }}</td>
          <td>{{ SEX_LABEL_MAP[row.sex] }}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="3">
            <div class="filter-table-no-data">暂无数据</div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped lang="less">
.form-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
}
.label-width {
  width: 50px;
}
.form-item-width {
  width: calc(100% - 50px);
}
.form-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.filter-info {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-bottom: 12px;
}
.filter-info-item {
  border: 1px solid #ccc;
  padding: 0px 4px;
  margin: 4px 8px;
}
.table-filter-test {
  border-collapse: collapse;
  border: 1px solid #ccc;
  th {
    width: 300px;
    border: 1px solid #ccc;
  }
  td {
    width: 300px;
    border: 1px solid #ccc;
  }
  .filter-table-no-data {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
