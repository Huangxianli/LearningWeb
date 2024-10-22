<template>
  <div class="base-table">
    <h4>基础表格</h4>
    <div class="base-table__before-table">
      <slot name="beforeTable" v-bind="{ selection }">
        <el-button size="mini" :disabled="!selection.length" @click="handlerClickDeleteBtn">删除选中行</el-button>
      </slot>
    </div>
    <el-table ref="tableRef" :data="tableData" stripe size="mini" :max-height="showTableRowLength">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column type="index" label="序号" center> </el-table-column>
      <MyTableColumn v-for=" col in dataColsConfig" :key="col.prop" :colConfig="col" @changeCellEdit="changeCellEdit"
        @changeCellValue="changeCellValue" @filterClick="openFilterBox"></MyTableColumn>
    </el-table>
    <FilterBox ref="filterBox"></FilterBox>
  </div>
</template>

<script>
import FilterBox from './FilterBox.vue';
import MyTableColumn from './MyTableColumn.vue';
import { baseTableColumns } from './tableColsConfig'
export default {
  components: {
    FilterBox,
    MyTableColumn
  },
  data () {
    return {
      tableRef: null,
      filterBox: null,
      headerMaxDeep: 1,
      tableData: [],
      allMinColumnConfig: [],
      tableColumnConfig: baseTableColumns,
      selection: [],
    };
  },
  computed: {
    showTableRowLength () {
      console.log(this.headerMaxDeep);
      return (this.headerMaxDeep + 10) * 36
    },
    dataColsConfig () {
      return this.tableColumnConfig.filter(col => col.colType !== 'opreationIcon');
      // return this.allMinColumnConfig.filter(col => col.colType !== 'opreationIcon');
    },
    dataMinColConfig () {
      return this.allMinColumnConfig.filter(col => col.colType !== 'opreationIcon')
    },
    opreationIncoColsConfig () {
      // return this.tableColumnConfig.filter(col => col.colType === 'opreationIcon');
      return this.allMinColumnConfig.filter(col => col.colType === 'opreationIcon');
    },
  },
  created () {
    this.getAllMinColProp();
    console.log(this.headerMaxDeep);
    this.setTableData();

  },
  mounted () {
    this.$refs.tableRef.$on('selection-change', this.selectionChange);
  },
  methods: {
    getAllMinColProp (cols, deep = 1) {
      let headerDeep = deep;
      const colsData = cols || this.tableColumnConfig;
      colsData.forEach(col => {
        if (!col.childColConfig?.length) {
          this.allMinColumnConfig.push(col);
        } else {
          this.getAllMinColProp(col.childColConfig, headerDeep + 1);
        }
      });
      if (this.headerMaxDeep < deep) {
        this.headerMaxDeep = deep;
      }
    },

    setTableData () {
      for (let i = 0; i < 20; i++) {
        const colsProp = this.dataMinColConfig.map(col => col.prop);
        const rowData = {
          key: i,
        };
        colsProp.forEach(prop => {
          const cellInfo = {};
          cellInfo.value = prop + i;
          cellInfo.cellIsEdit = false;
          this.$set(rowData, prop, cellInfo);
        });
        this.tableData.push(rowData);
      }
    },

    dblclickHandler (row, prop) {
      this.$set(row[prop], 'cellIsEdit', true);
    },

    changeCellEdit (cell) {
      debugger
      cell.cellIsEdit = true
    },

    changeCellValue ({ cell, newValue }) {
      cell.value = newValue;
    },

    selectionChange (selection) {
      this.selection = selection;
      // 外部写的selectionChange(selection);
    },

    handlerClickDeleteBtn () {
      const selectKeys = this.selection.map(row => row.key);
      this.tableData = this.tableData.filter(row => !selectKeys.includes(row.key));
      this.selection = [];
    },

    openFilterBox (e) {
      this.$refs.tableRef.$el.append(this.$refs.filterBox.$el);
      const tableClientRect = this.$refs.tableRef.$el.getBoundingClientRect();
      const eClientRect = e.target.getBoundingClientRect();
      console.log(e.target.getBoundingClientRect());
      this.$refs.filterBox.$el.style.position = 'absolute';
      this.$refs.filterBox.$el.style.top = (eClientRect.bottom - tableClientRect.top || 0) + 'px';
      this.$refs.filterBox.$el.style.left = (eClientRect.left - tableClientRect.left || 0) + 'px';
    },
  }

}
</script>

<style scpoed>
.base-table {
  margin-bottom: 20px;
}

.el-table__header-wrapper {
  border-top: 1px solid rgb(235, 238, 245);
}

.el-table__fixed-header-wrapper {
  border-top: 1px solid rgb(235, 238, 245);
}

.table-opreation-col-icon {
  color: #409eff;
}

.table-opreation-col-icon:before {
  font-size: 14px;
}

.table-opreation-col-icon-disabled {
  cursor: not-allowed;
  color: #c0c4cc;
}

.base-table .table-opreation-col-icon-button.el-button {
  box-sizing: content-box;
  height: 22px;
  border: none;
  padding: 0;
  background-color: transparent;
  color: #409eff;
}

.base-table .table-opreation-col-icon-button.el-button.is-disabled {
  background-color: transparent;
  color: #c0c4cc
}

.base-table .table-opreation-col-icon-button.el-button::after {
  height: 22px;
  line-height: 14px;
  font-size: 14px;
}

.table-cell-edit-input.el-input {
  line-height: 22px;
}

.table-cell-edit-input .el-input__inner {
  height: 23px;
  line-height: 23px;
}

.base-table__before-table {
  margin-bottom: 8px;
}
</style>

<style>
.el-tooltip__popper {
  padding: 4px 10px;
}
</style>