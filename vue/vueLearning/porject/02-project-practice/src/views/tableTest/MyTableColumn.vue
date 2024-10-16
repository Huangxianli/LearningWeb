<template>
  <el-table-column v-bind="colConfig">
    <template v-if="colConfig.childColConfig">
      <MyTableColumn v-for="childColConfig in colConfig.childColConfig" :key="childColConfig.prop"
        :colConfig="childColConfig" @changeCellEdit="changeCellEdit">
        <template v-slot="{ row, prop }">
          <slot name="default" v-bind="{ row, prop }">
            <!-- <span v-if="!row[prop].cellIsEdit">{{ row[prop].value }}</span>
            <template v-else>
              <el-input size="mini"></el-input>
            </template> -->
            <MyTableCell :isEdit="row[prop].cellIsEdit" editType="text" :value="row[prop].value"
              @changeCellValue="(newValue) => changeCellValue(row[prop], newValue)">
            </MyTableCell>
          </slot>
        </template>

      </MyTableColumn>
    </template>
    <template v-slot="{ row }">
      <span @click="clickHandler(row[colConfig.prop])" @dblclick="bdclickHandler(row[colConfig.prop])">
        <slot name="default" v-bind="{ row, prop: colConfig.prop }">
          <!-- <span v-if="!row[colConfig.prop].cellIsEdit">{{ row[colConfig.prop].value }}</span>
          <template v-else></template> -->
          <MyTableCell :isEdit="row[colConfig.prop].cellIsEdit" editType="text" :value="row[colConfig.prop].value"
            @changeCellValue="(newValue) => changeCellValue(row[colConfig.prop], newValue)">
          </MyTableCell>
        </slot>
      </span>
    </template>
    <template v-slot:header="{ column }">
      <template>
        <span v-if="true" class="el-icon-edit"></span>
        <span>{{ column.label }}</span>
      </template>
    </template>

  </el-table-column>
</template>

<script>
import MyTableCell from './MyTableCell.vue';
export default {
  name: 'MyTableColumn',
  components: {
    MyTableCell
  },
  props: {
    colConfig: {
      type: Object,
      required: true,
      default: () => ({}),
    }
  },
  methods: {
    getData (data) {
      console.log(data)
      return '';
    },
    clickHandler (cell) {
      this.$emit('changeCellEdit', cell);
    },
    changeCellValue (cell, newValue) {
      this.$emit('changeCellValue', {
        cell,
        newValue
      })
    },
    changeCellEdit (cell) {
      this.$emit('changeCellEdit', cell);
    },
    bdclickHandler (cell) {
      this.$emit('changeCellEdit', cell);
    },
  }
}
</script>

<style></style>