<template>
  <el-table-column v-bind="colConfig">
    <!-- 注意，即使多级表头和单元格的内容都是依靠<el-table-column />的默认插槽，但是要将这两个分开写，不然多级表头会有问题 -->
    <template v-if="colConfig.childColConfig" v-slot:default>
      <MyTableColumn v-for="childColConfig in colConfig.childColConfig" :key="childColConfig.prop"
        :colConfig="childColConfig" @changeCellEdit="changeCellEdit" @filterClick="handlerClickFilterIcon">
        <template v-slot:default="defaultScoped">
          <slot name="default" v-bind="{ ...defaultScoped }">
            <!-- <MyTableCell :isEdit="defaultScoped.row[childColConfig.prop].cellIsEdit" editType="text"
              :value="defaultScoped.row[childColConfig.prop].value"
              @changeCellValue="newValue => changeCellValue(defaultScoped.row[childColConfig.prop], newValue)">
            </MyTableCell> -->
          </slot>
        </template>
        <template v-slot:header="headerScoped">
          <template>
            <slot name="header" v-bind="{ ...headerScoped }">
              <span>{{ headerScoped.column.label }}</span>
            </slot>
          </template>
        </template>
      </MyTableColumn>
    </template>

    <template v-else v-slot:default="headerScoped">
      <span @click="clickHandler(headerScoped.row[colConfig.prop])"
        @dblclick="bdclickHandler(headerScoped.row[colConfig.prop])">
        <slot name="default" v-bind="{ ...headerScoped }">
          <MyTableCell :isEdit="headerScoped.row[colConfig.prop].cellIsEdit" editType="text"
            :value="headerScoped.row[colConfig.prop].value"
            @changeCellValue="newValue => changeCellValue(headerScoped.row[colConfig.prop], newValue)">
          </MyTableCell>
        </slot>
      </span>
    </template>

    <template v-slot:header="headerScoped">
      <template>
        <section class="my-table-column__header">
          <span class="my-table-column__header-edit">
            <span v-if="true && !colConfig.childColConfig" class="el-icon-edit"></span>
          </span>
          <span class="my-table-column__header-main-content">
            <slot name="header" v-bind="{ ...headerScoped }">
              <span>{{ headerScoped.column.label }}</span>
            </slot>
          </span>
          <span class="my-table-column__header-filter" @click="handlerClickFilterIcon">
            <span class="iconfont icon-shaixuan"></span>
          </span>
        </section>
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
      debugger
      this.$emit('changeCellEdit', cell);
    },
    bdclickHandler (cell) {
      debugger
      this.$emit('changeCellEdit', cell);
    },
    handlerClickFilterIcon (e) {
      this.$emit('filterClick', e);
    },
  }
}
</script>

<style scoped>
.my-table-column__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}



.my-table-column__header-edit {
  display: inline-block;
  width: 16px;
}

.my-table-column__header-main-content {
  flex-grow: 1;
}

.my-table-column__header-filter {
  cursor: pointer;
}

.iconfont {
  font-size: 14px;
}
</style>