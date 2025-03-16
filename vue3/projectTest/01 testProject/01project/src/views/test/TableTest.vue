<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { TableInstance, TableColumnCtx } from 'element-plus';
interface TableColInfo {
  label: string,
  prop: string,
  width?: number
};

interface TableRow {
  id: number,
  name: string,
  age: number,
  address: string
};
const colsInfo = reactive<TableColInfo[]>([
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
    id: i,
    name: 'name' + i,
    age: i,
    address: 'address' + i,
  };
  allTableData.push(row);
}
const tableData = ref<TableRow[]>([]);
const setTableData = (pageSize: number, currentPage: number) => {
  tableData.value = allTableData.filter((item, index) => {
    return (index > pageSize * (currentPage - 1)) && (index <= pageSize * currentPage)
  })
};

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

setTableData(pageSize.value, currentPage.value);

const checkedId = ref<number | string>('');
const checkedChange: (row: TableRow) => void = (row) => {
  checkedId.value = row.id;
};

const tableRowClassName = ({ row, rowIndex }: { row: TableRow, rowIndex: number }): string => {
  return rowIndex % 2 === 0 ? 'warn-row' : 'error-row';
};

const selectable = (row: TableRow, index: number
): boolean => {
  return index % 2 === 0;
};

const tableRef = ref<TableInstance>();
const selectDisabledRow = () => {
  const data = tableData.value.filter((item, index) => { return index % 2 !== 0 });
  data.forEach(row => {
    tableRef.value!.toggleRowSelection(row, true, true);
  });
};
const selectFirstRowRow = () => {
  tableRef.value!.toggleRowSelection(tableData.value[0], true, true);
};

const sortInfo: { prop: string, order: string | null } = {
  prop: '',
  order: null,
};
const sortChange = (data: { prop: string, order: string | null }) => {
  sortInfo.prop = data.prop;
  sortInfo.order = data.order;
}

const filterMethod = (value: string, row: TableRow, column: TableColumnCtx<TableRow>) => {
  // debugger

}

const filterChange = (filters: object) => {
  filters;
}
</script>

<template>
  <section class="table-test">
    <div class="table-header">
      <el-button @click="selectDisabledRow">选择禁用的</el-button>
      <el-button @click="selectFirstRowRow">选择第一个</el-button>
    </div>
    <el-table ref="tableRef" :data="tableData" size="small" :highlight-current-row="false"
      :row-class-name="tableRowClassName" @sort-change="sortChange" @filter-change="filterChange">
      <!-- row-class-name 最好不要和 stripe、highlight-current-row  一起使用 -->
      <!-- 要使用 filter-change 事件，就要给列设置 column-key 属性，如果不设置的话，事件的参数的中的 key 是异常的 -->
      <el-table-column type="index" align="center" label="序号" width="50" show-overflow-tooltip></el-table-column>
      <el-table-column type="selection" :selectable="selectable" width="50" show-overflow-tooltip></el-table-column>
      <el-table-column label="选择" prop="temp0" align="center" width="50">
        <template #default="{ row }">
          <el-radio size="small" :value="row.id" v-model="checkedId" @change="checkedChange(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="temp1" label="一级表头">
        <el-table-column prop="temp1_1" label="二级表头1">
        </el-table-column>
        <el-table-column prop="temp1_2" label="二级表头2">
          <el-table-column prop="temp1_2_1" label="三级表头1">
          </el-table-column>
          <el-table-column label="三级表头2" prop="temp1_2_2">
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column v-for="col in colsInfo" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width"
        show-overflow-tooltip sortable :sort-orders="['ascending', 'descending', null]" :column-key="col.prop" :filters="[
          { text: 'Home', value: 'Home' },
          { text: 'Office', value: 'Office' },
        ]"></el-table-column>
      <el-table-column prop="temp" label="操作" fixed="right" :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' },
      ]">
        <template #header="{ column, $index }">
          <div>
            {{ column }}-{{ $index }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-pagination-box">
      <el-pagination size="small" :total="allTableData.length" :page-sizes="[5, 10, 20, 50]" :crrent-page="currentPage"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
    </div>

  </section>
</template>

<style scoped>
.table-header {
  margin-bottom: 8px;
}

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

.table-test :deep(.warn-row) {
  background-color: antiquewhite;
}

.table-test :deep(.warn-row) {
  background-color: antiquewhite;
}

.table-test :deep(.error-row) {
  background-color: red;
}
</style>