<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners" :inhert="false">
    <el-radio v-for="option in store.options" :key="option[id]" :label="option[label]" :inhert="false">{{
      option[optionValue] }}</el-radio>
  </el-radio-group>

</template>

<script>

export default {
  props: {
    store: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: 'id'
    },
    label: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      default: 'value'
    }
  }
}
</script>

<style scoped></style>