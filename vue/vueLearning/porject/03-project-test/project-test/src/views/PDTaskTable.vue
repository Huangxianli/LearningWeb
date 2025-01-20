<template>
  <div>
    <el-table class="p-d-task-table" :data="tableData" size="mini" max-height="396">
      <el-table-column show-overflow-tooltip v-for="col in tableColConfig" :key="col.key" :prop="col.prop"
        :label="col.label" :width="col.width" :fixed="col.fixed">
        <!-- <template v-if="tabKey === 'ongoingTasks'">
          <el-button>详情</el-button>
          <el-button>提交</el-button>
        </template> -->
        <template v-slot="{ row }">
          <span v-if="col.prop !== 'operation'">{{ row[col.prop] }}</span>
          <template v-else>
            <el-button type="primary" size="mini">详情</el-button>
            <el-button type="primary" size="mini" @click="clickComit">提交</el-button>
          </template>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <PDCommitTaskDialogVue ref="commitTaskRef" />
  </div>
</template>

<script>
import PDCommitTaskDialogVue from './PDCommitTaskDialog.vue'
export default {
  components: {
    PDCommitTaskDialogVue,
  },
  props: {
    allData: {
      default: () => [],
    },
    tabKey: {
      default: ''
    },
  },
  data () {
    return {
      tableData: this.allData.filter((item, index) => index >= (this.currentPage - 1) * this.pageSize && index < this.currentPage * this.pageSize),
      currentPage: 1,
      pageSize: 10,
      // commitTaskRef: null,
      tableColConfig: [
        {
          key: 'serialNumber',
          label: '序号',
          prop: 'serialNumber',
          width: 100
        },
        {
          key: 'taskName',
          label: '任务名称',
          prop: 'taskName',
        },
        {
          key: 'belongingProject',
          label: '所属项目',
          prop: 'belongingProject',
        },
        {
          key: 'taskType',
          label: '任务类型',
          prop: 'taskType',
        },
        {
          key: 'belongingMilestone',
          label: '所属里程碑',
          prop: 'belongingMilestone',
        },
        {
          key: 'releaseTime',
          label: '发布时间',
          prop: 'releaseTime',
        },
        {
          key: 'operation',
          label: '操作',
          prop: 'operation',
          width: 150,
          fixed: 'right'
        }
      ],
    }
  },
  created () {
    this.getTableData()
  },
  computed: {
    total () {
      return this.allData.length
    }
  },
  methods: {
    getTableData () {
      this.tableData = this.allData.filter((item, index) => index >= (this.currentPage - 1) * this.pageSize && index < this.currentPage * this.pageSize)
    },
    handleSizeChange (size) {
      this.currentPage = 1;
      this.pageSize = size;
      this.getTableData();
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage;
      this.getTableData();
    },
    clickComit () {
      this.$refs.commitTaskRef.openDialog();
    }
  }
}
</script>

<style scoped>
.p-d-task-table {
  margin-bottom: 12px;
}

.el-button--mini {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>