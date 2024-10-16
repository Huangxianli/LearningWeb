<template>
  <div class="base-table">
    <h4>基础表格</h4>
    <el-table :data="tableData" stripe size="mini" :max-height="showTableRowLength">
      <el-table-column type="index" label="序号" center> </el-table-column>
      <MyTableColumn v-for=" col in dataColsConfig" :key="col.prop" :colConfig="col" @changeCellEdit="changeCellEdit"
        @changeCellValue="changeCellValue">
        <!-- <template v-slot:default="{ row, prop }">
          {{ row[prop].value }}
        </template> -->
      </MyTableColumn>
      <!-- <el-table-column v-for="col in opreationIncoColsConfig" :key="col.prop" :label="col.lable || '操作'"
        :width="col.width" :fixed="col.fixed">
        <template>
          <el-tooltip effect="light" placement="top" :hide-after="2000">
            <template slot="content">
              {{ col.iconConfig.tipInfo }}
            </template>
            <el-button class="table-opreation-col-icon-button" :icon="col.iconConfig.iconClass"></el-button>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <!-- <MyTableColumn :colsConfig="dataColsConfig" /> -->
    </el-table>
  </div>


</template>

<script>
import MyTableColumn from './MyTableColumn.vue';
import { baseTableColumns } from './tableColsConfig'
export default {
  components: {
    MyTableColumn
  },
  data () {
    return {
      headerMaxDeep: 1,
      tableData: [],
      allMinColumnConfig: [],
      tableColumnConfig: baseTableColumns
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
        const rowData = {};
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
      cell.cellIsEdit = true
    },
    changeCellValue ({ cell, newValue }) {
      cell.value = newValue;
    }
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
</style>

<style>
.el-tooltip__popper {
  padding: 4px 10px;
}
</style>