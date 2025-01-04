<template>
  <section>
    <el-table v-bind="$attrs" :data="store.tableData" size="mini" v-loading="store.status === REQUEST_STATUS.LOADING">
      <slot></slot>
    </el-table>
    <div>
      {{ store.currentPage }}
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="store.currentPage" :page-sizes="store.pageSizes" :page-size="store.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="store.total" :pager-count="5">
    </el-pagination>
  </section>
</template>

<script>
import { REQUEST_STATUS } from '@/constant/requestStatus'
export default {
  /**
   * 包含四类的继承才是优秀的二次开发的组件
   * 属性 事件 方法 slot
   */
  /**
   * 组件必须关联模型
   * 模型：替我们对某个数据进行序列化
   */
  provide () {
    return {
      store: this.store,
    }
  },
  props: {
    store: { // 该store 是操作数据
      required: true,
      type: Object,
    }
  },
  data () {
    return {
      aaa: 10
    }
  },
  computed: {
    REQUEST_STATUS () {
      return REQUEST_STATUS;
    },
  },
  created () {
    if (this.store.autoLoad && this.store.url) {
      this.store.load();
    }
  },
  methods: {
    handleSizeChange (size) {
      // 这里要回到第一页
      this.store.load({ currentPage: 1, pageSize: size });
    },

    handleCurrentChange (currentPage) {
      this.store.load({ currentPage });

      setTimeout(() => {
        console.log('this.store.currentPage')
        console.log(this.store.currentPage)
        console.log(this.store)
        this.aaa = 1;
      }, 10000);
    },
  }
}
</script>

<style scpoed></style>