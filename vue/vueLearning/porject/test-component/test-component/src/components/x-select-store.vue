<template>
  <el-select size="mini" v-bind="$attrs" v-on="$listeners">
    <el-option v-for=" option in store.data" :key="option[keyMapKey]" :label="option[labelMapKey]"
      :value="option[valueMapKey]"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    store: {
      default: () => ({ data: [] }),
      type: Object,
      required: true,
      validator: (value) => Array.isArray(value.data),
    },
    keyMapKey: {
      default: 'key',
      type: String,
    },
    labelMapKey: {
      default: 'label',
      type: String,
    },
    valueMapKey: {
      default: 'value',
      type: String,
    }
  },
  created () {
    if (this.store.autoLoad) {
      this.store.load();
    }
  }
}
</script>

<style></style>