<template>
  <section>
    <el-table v-bind="$attrs" :data="store.data" v-on="$listeners">
      <slot name="default"></slot>
    </el-table>
    <el-pagination :current-page="store.currentPage" :page-sizes="store.pageSizes" :page-size="store.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="store.total" :pagerCount="5"
      @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </section>
</template>

<script>

export default {
  props: {
    store: {
      typp: Object,
      default: () => ({
        data: [],
      }),
      required: true,
      validate: store => {
        return store.data
      }
    },
    pagerCount: {
      type: Number,
      default: 5,
    }
  },
  methods: {
    handleSizeChange () { },
    handleCurrentChange () { },
  },
}
</script>

<style></style>