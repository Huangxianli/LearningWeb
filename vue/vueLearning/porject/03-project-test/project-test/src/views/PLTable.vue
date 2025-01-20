<template>
  <section>
    <el-table :data="tableData" border size="mini" max-height="396" height="396">
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column v-for="col in tableColConfig" :key="col.prop" :label="col.label" :prop="col.prop"
        show-overflow-tooltip :fixed="col.fixed" :min-width="col.minWidth">
        <template #default="{ row, $index }">
          <template v-if="col.prop === 'operation'">
            <div>
              <el-popover placement="left" :visible-arrow="false" width="30" trigger="click">
                <template>

                </template>
                <span class="clickCell" slot="reference">操作</span>
              </el-popover>
            </div>
          </template>
          <span v-else
            :class="[col.isClickCol && col?.isClickCell(row, $index, tableData) ? 'clickCell' : '', col.clickColor ?? '']"
            @click="() => clickCell(row, col.prop)">{{
              row[col.prop]
            }}</span>
        </template>
      </el-table-column>
    </el-table>

  </section>
</template>

<script>
import { PROJECT_LIST_TABLE_CONFIG } from '@/views/PLTableConfig';
import { PROJECT_LIST_TABLE_DATA } from '@/mockData/p-l-table'
export default {
  data () {
    return {
      tableColConfig: PROJECT_LIST_TABLE_CONFIG,
      tableData: [],
    }
  },
  created () {
    this.tableData = JSON.parse(JSON.stringify(PROJECT_LIST_TABLE_DATA));
  },
  methods: {
    clickCell (row, prop) {
      this.$emit('clickCell', row, prop);
    }
  }
}
</script>

<style scoped>
.clickCell {
  cursor: pointer;
  color: #0099ff;
}

.operation-button-group {
  display: flex;
  flex-direction: column;
}
</style>