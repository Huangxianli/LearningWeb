<template>
  <section>
    <el-form :model="model.formData" label-width="auto">
      <el-row>
        <el-col :span="span">
          <el-form-item label="项目阶段模板" prop="template">
            <XSelectStore v-model="model.formData.template" :store="projectModelStore" d="id" label="label"
              optionValue="value" />
          </el-form-item>
        </el-col>
        <el-col :span="span">
          <el-form-item label="项目阶段模板" prop="template">
            <XSelectStore v-model="model.formData.template" :store="projectModelStore" d="id" label="label"
              optionValue="value" />
          </el-form-item>
        </el-col>
        <el-col :span="span">
          <el-form-item label="项目阶段模板" prop="template">
            <XSelectStore v-model="model.formData.template" :store="projectModelStore" d="id" label="label"
              optionValue="value" />
          </el-form-item>
        </el-col>
        <el-col :span="span">
          <el-form-item label="项目阶段模板" prop="template">
            <XSelectStore v-model="model.formData.template" :store="projectModelStore" d="id" label="label"
              optionValue="value" />
          </el-form-item>
        </el-col>
        <el-col :span="span">
          <el-form-item label="项目阶段模板" prop="template">
            <XSelectStore v-model="model.formData.template" :store="projectModelStore" d="id" label="label"
              optionValue="value" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div>项目详情</div>

    <div>客户信息</div>

    <div>项目阶段</div>
    <hr />
    <!-- <div>
      <el-button type="primary">新增</el-button>
    </div> -->
    <!-- <el-table>
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column label="阶段"></el-table-column>
      <el-table-column label="金额"></el-table-column>
      <el-table-column label="比例"></el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" plain>编辑</el-button>
        <el-button type="danger" plain>删除</el-button>
      </el-table-column>
    </el-table> -->
    <XTableEditor :data="model.formData.tableData">
      <template #table-header-button="{ addRow }">
        <el-button type="primary" size="mini" @click="addRow">新增</el-button>
      </template>
      <template #default="{ editRow, deleteRow, confirm, editRowsId }">
        <el-table-column type="index" align="center"></el-table-column>
        <XTableColumnEditor label="阶段" prop="time">
          <template #show="scoped">{{ scoped.row[scoped.column.property] }}</template>
          <template #edit="scoped">
            <el-input v-model="scoped.row[scoped.column.property]" />
          </template>
        </XTableColumnEditor>
        <XTableColumnEditor label="金额">
          <template #show></template>
          <template #edit></template>
        </XTableColumnEditor>
        <XTableColumnEditor label="比例">
          <template #show></template>
          <template #edit></template>
        </XTableColumnEditor>
        <el-table-column label="操作">
          <template #default="scoped">
            <el-button v-if="editRowsId.includes(scoped.row.rowId)" type="text" size="mini"
              @click="confirm(scoped)">确定</el-button>
            <el-button v-else type="text" size="mini" @click="editRow(scoped)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteRow(scoped)">删除</el-button>
          </template>

        </el-table-column>
      </template>
    </XTableEditor>
    <div>外委管理</div>

  </section>
</template>

<script>
import XSelectStore from '@/components/XSelectStore.vue';
import XTableEditor from '@/components/XTableEditor.vue';
import XTableColumnEditor from '@/components/XTableColumnEditor.vue';

import { ProjectModelStore, ProjectModel } from './project-store';
export default {
  components: {
    XSelectStore,
    XTableEditor,
    XTableColumnEditor
  },
  props: {
    col: {
      type: [Number, String],
      default: 2,
    },
  },
  data () {
    return {
      projectModelStore: new ProjectModelStore({}),
      model: new ProjectModel({ tableData: [] }),
    }
  },
  computed: {
    span () {
      return 24 / this.col;
    }
  },
  methods: {
  }

}
</script>

<style></style>