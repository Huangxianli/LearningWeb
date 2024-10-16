<template>
  <span>
    <span v-if="!isEdit">{{ value }}</span>
    <template v-else>
      <el-input v-if="editType === 'text'" size="mini" v-model="modelValue"></el-input>

    </template>
  </span>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    editType: {
      type: String,
      required: false,
      default: 'text',
    },
    value: {
      type: String,
      required: true,
      default: '',
    }
  },
  computed: {
    modelValue: {
      get () {
        return this.value
      },
      set (value) {
        value;
        this.$emit('changeCellValue', value)
      }
    }
  }
}
</script>

<style></style>