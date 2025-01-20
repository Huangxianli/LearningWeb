<template>
  <section class="test-view-1">
    <x-table-store :store="store">
      <template #headerButton>
        <el-button type="primary" size="mini" @click="addNewRow">新增</el-button>
      </template>
      <template #headerSearch>
        <el-form :model="store.filter">
          <el-form-item prop="formItem1" label="formItem1">
            <xSelectStore popper-class="123" :store="select1Store" v-model="store.filter.formItem1"
              @visible-change="visibleChange">
            </xSelectStore>
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

    <div>

      <el-form :model="form" label-width="auto">
        <el-row class="row_flex">
          <el-col :span="6">
            <el-form-item label="1">
              <el-select v-model="form.item1" multiple>
                <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="2">
              <el-select v-model="form.item2" multiple>
                <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="3">
              <el-select v-model="form.item3" multiple>
                <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="4">
              <el-select v-model="form.item4" multiple>
                <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="5">
              <el-select v-model="form.item5" multiple>
                <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="6">
              <el-select v-model="form.item6" multiple>
                <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="7">
              <el-select v-model="form.item7" multiple>
                <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="8">
              <el-select v-model="form.item8" multiple>
                <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="9"></el-form-item>
      </el-form>

    </div>

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
      form: {}
    }
  },
  mounted () {
  },
  methods: {
    async addNewRow () {
      const diaolog = createPromiseDialog(TestView1Dialog);
      let data = {};
      try {
        data = await diaolog({
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
        debugger
      }
    },
    search () {
      try {
        this.store.search();
      } catch (err) {

      }
    },
    reset () { },
    visibleChange (visible) {
    }
  }
}
</script>

<style scoped>
.test-view-1 {
  height: 100%;
}

.row_flex {
  display: flex;
  flex-flow: row wrap;
}
</style>