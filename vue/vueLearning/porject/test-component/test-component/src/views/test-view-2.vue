<template>
  <div>
    <XEditorTable :data="data">
      <template #default="{
        editRow,
        deleteRow
      }">
        <el-table-column type="index"></el-table-column>
        <XTableEditorColumn prop="col1"></XTableEditorColumn>
        <XTableEditorColumn prop="col2"></XTableEditorColumn>
        <el-table-column label="编辑">
          <template #default="scope">
            <el-button size="mini" type="text" @click="editRow(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </XEditorTable>
  </div>
</template>

<script>
import XEditorTable from '@/components/x-editor-table.vue';
import XTableEditorColumn from '@/components/x-table-editor-column.vue';
export default {
  components: {
    XEditorTable,
    XTableEditorColumn
  },
  data () {
    return {
      data: [
        {
          id: 1,
          col1: '1-1',
          col2: '2-1',
        },
        {
          id: 2,
          col1: '1-2',
          col2: '2-2',
        },
        {
          id: 3,
          col1: '1-3',
          col2: '2-3',
        },
      ]
    }
  }
}
</script>

<style></style>