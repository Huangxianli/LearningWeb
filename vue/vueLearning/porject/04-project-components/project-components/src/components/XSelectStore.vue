<template>
  <el-select v-bind="$attrs" :value-key="id" v-on="$listeners">
    <el-option v-for="option in store.options" :key="option[id]" :label="option[label]"
      :value="optionValue ? option[optionValue] : option">
    </el-option>
  </el-select>
</template>

<script>

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    store: {
      type: Object,
      default: () => ({})
    },
    id: { // 如果 el-select 绑定的是对象的时候，要值定该属性，用于
      type: String,
      default: 'id',
    },
    label: {
      type: String,
      default: 'label',
    },
    optionValue: { // 没有传递该值的时候，option 的 value 绑定就直接是一个对象，这个时候 select 必须要绑定 value-key 属性来确保根据哪一个属性去 option 中去匹配
      type: String,
      default: '',
    }
  },
  created () {
    // this.store.load({}, []);
  }
}
</script>

<style></style>