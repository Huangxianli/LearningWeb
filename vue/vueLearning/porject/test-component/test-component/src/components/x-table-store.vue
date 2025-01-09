<template>
  <section class="x-table-store-box" v-loading="store.status === LOAD_STATUS.START">
    <div class="x-table-store-header-button">
      <slot name="headerButton"></slot>
    </div>
    <el-table class="x-table-store-table" :data="store.data" size="mini" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </el-table>
    <el-pagination v-if="store.needPagination" class="x-table-store-pagination " :currentPage.sync="store.currentPage"
      :pageSizes="store.pageSizes" :pageSize.sync="store.pageSize" :total="store.total" :pagerCount="store.pagerCount"
      layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </section>
</template>

<script>
import { LOAD_STATUS } from './constant';
export default {
  // 当前页实际的条数如果多于下拉框中每页的条数，最大的高度为（当前页的的条数 + 1）* 每行的高度；当前页的实际的条数如果小于下拉框中每页的条数，表格的最大高度为（实际显示的条数 + 1）* 每页的高度
  props: {
    store: {
      default: () => ({
        data: []
      }),
      type: Object,
      required: true,
    }
  },
  data () {
    return {
    }
  },
  computed: {
    LOAD_STATUS () {
      return LOAD_STATUS;
    }
  },
  created () {
    if (this.store.autoLoad) {
      this.store.load();
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      // 设置传入的 params
      this.store.load({ currentPage: 1, pageSize });
    },
    handleCurrentChange (currentPage) {
      // 设置传入的 params
      this.store.load({ currentPage, pageSize: this.store.pageSize });
    }
  }
}
</script>

<style scoped>
.x-table-store-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
}

.x-table-store-header-button {
  margin-bottom: 12px;
}

.x-table-store-table {}

.x-table-store-table /deep/ .el-table__body-wrapper {}


.x-table-store-pagination {
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}


.x-table-store-pagination /deep/ .el-pagination__total {
  margin-right: 12px;
}

.x-table-store-pagination /deep/ .el-pagination__sizes {
  margin-right: auto;
}

.x-table-store-pagination /deep/.el-pagination__sizes .x-table-store-pagination /deep/ .el-pagination__jump,
.el-pager,
.btn-prev,
.btn-next {
  margin-left: 12px;
}
</style>