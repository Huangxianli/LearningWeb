<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';

import OpenAndClose from '@/components/OpenAndClose.vue';

interface TableColInfo {
  label: string,
  prop: string,
  width?: number
}

interface TableRow {
  name: string,
  age: number,
  address: string
};
const colsInfo: TableColInfo[] = reactive([
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '年龄',
    prop: 'age',
    width: 50
  },
  {
    label: '地址',
    prop: 'address'
  },
]);

const allTableData: TableRow[] = [];
for (let i = 0; i <= 134; i++) {
  const row: TableRow = {
    name: 'name' + i,
    age: 1,
    address: 'address' + i,
  };
  allTableData.push(row);
}
const tableData: Ref<TableRow[]> = ref([]);
const setTableData = (pageSize: number, currentPage: number) => {
  tableData.value = allTableData.filter((item, index) => {
    return (index > pageSize * currentPage) && (index <= pageSize * (currentPage + 1))
  })
}

const currentPage = ref<number>(1);
const handleCurrentChange: (current: number) => void = current => {
  currentPage.value = current;
  setTableData(pageSize.value, currentPage.value);
};

const pageSize = ref<number>(5);
const handleSizeChange: (size: number) => void = size => {
  currentPage.value = 1;
  pageSize.value = size;
  setTableData(pageSize.value, currentPage.value);
};

const rowClassName = ({ rowIndex }: { rowIndex: number }): string => {
  if (rowIndex % 2 === 0) {
    return 'warn-row-class'
  } else {
    return 'error-row-class'
  }
}


setTableData(pageSize.value, currentPage.value);
</script>

<template>
  <section class="table-test">
    <el-table :data="tableData" size="small" :row-class-name="rowClassName">
      <!-- row-class-name 尽量不要和 stripe 一起使用 -->
      <el-table-Column type="index" align="center" label="序号" width="50" show-overflow-tooltip></el-table-Column>
      <el-table-Column v-for="col in colsInfo" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width"
        show-overflow-tooltip></el-table-Column>
    </el-table>
    <div class="table-pagination-box">
      <el-pagination size="small" :total="allTableData.length" :page-sizes="[5, 10, 20, 50]" :crrent-page="currentPage"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
    </div>

  </section>
</template>

<style scoped>
.table-pagination-box {
  margin-top: 12px;
}

.el-pagination :deep(.el-pagination__total) {
  margin-left: 0px;
}

.el-pagination :deep(.el-pagination__sizes) {
  margin-left: 8px;
  margin-right: auto;
  /* flex 布局中 margin auto 会自动占据剩余部分 */
}

.el-pagination :deep(.el-pagination__jump) {
  margin-left: 8px;
}

.el-pagination :deep(.el-pager) {
  margin-left: 8px;
}

.el-pagination :deep(.btn-prev,
  .btn-next) {
  margin-left: 8px;
}

.table-test {
  /* 这里的设计实现了表格的高度自适应，注意 height 一定要是能够追溯成具体值才可以 */
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-test :deep(.warn-row-class) {
  background-color: bisque;
}

.table-test :deep(.error-row-class) {
  background-color: red;
}
</style>