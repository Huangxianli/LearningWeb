<template>
  <section class="test-view-1">
    <x-table-store :store="store">
      <template #headerButton>
        <el-button type="primary" size="mini" @click="addNewRow">新增</el-button>
      </template>
      <el-table-column type="index" algin="center"></el-table-column>
      <el-table-column label="第一列" prop="col1"></el-table-column>
      <el-table-column label="第二列" prop="col2"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </x-table-store>
  </section>
</template>

<script>
import XTableStore from '@/components/x-table-store.vue';
import TestView1Dialog from './test-view-1-dialog.vue';

import { createPromiseDialog } from '@/components/createPromiseDialog.js';
import { TestView1Store } from './test-view-1-store.js';
export default {
  name: 'test-view-1',
  components: {
    XTableStore,
    TestView1Dialog
  },
  data () {
    return {
      store: new TestView1Store(),
      a: { a: 1 }
    }
  },
  mounted () {
    console.log(this.a)
  },
  methods: {
    addNewRow () {
      const diaolog = createPromiseDialog(TestView1Dialog)
      try {
        diaolog()
      } catch (error) {

      }
    }
  }
}
</script>

<style scoped>
.test-view-1 {
  height: 100%;
}
</style>