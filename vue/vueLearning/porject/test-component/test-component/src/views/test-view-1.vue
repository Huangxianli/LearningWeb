<template>
  <section class="test-view-1">
    <x-table-store :store="store">
      <template #headerButton>
        <el-button type="primary" size="mini" @click="addNewRow">新增</el-button>
      </template>
      <template #headerSearch>
        <el-form :model="store.filter">
          <el-form-item prop="formItem1" label="formItem1">
            <xSelectStore :store="select1Store" v-model="store.filter.formItem1"></xSelectStore>
          </el-form-item>
          <el-form-item prop="formItem2" label="formItem2">
            <el-input v-model="store.filter.formItem2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="search">搜索</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
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
import xSelectStore from '@/components/x-select-store.vue';
import TestView1Dialog from './test-view-1-dialog.vue';

import { createPromiseDialog } from '@/components/createPromiseDialog.js';
import { TestView1Store, TestView1SelectStore } from './test-view-1-store.js';

import { DIALOG_TYPE } from '@/components/constant';
export default {
  name: 'test-view-1',
  components: {
    XTableStore,
    xSelectStore,
    TestView1Dialog
  },
  data () {
    return {
      store: new TestView1Store(),
      select1Store: new TestView1SelectStore(),
    }
  },
  mounted () {
  },
  methods: {
    addNewRow () {
      const diaolog = createPromiseDialog(TestView1Dialog);
      try {
        diaolog({
          dialogType: DIALOG_TYPE.ADD
        }, {
          props: {
            // dialogType: DIALOG_TYPE.READ,
            dialogType: DIALOG_TYPE.ADD,
          }
        }, {
          afterComfirm () {
          }
        })
      } catch (error) {
      }
    },
    search () {
      try {
        this.store.search();
      } catch (err) {

      }
    },
    reset () { },
  }
}
</script>

<style scoped>
.test-view-1 {
  height: 100%;
}
</style>