<template>
  <section>
    <el-form label-width="auto">
      <el-form-item label="表单项1">
        <span v-if="isRead">123</span>
        <el-input v-else></el-input>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { DIALOG_TYPE } from '@/components/constant'
export default {
  props: {
    dialogType: {
      default: DIALOG_TYPE.READ,
      type: String,
      required: false,
      validatot (value) {
        return Object.values(DIALOG_TYPE).includes(value);
      }
    }
  },
  computed: {
    isRead () {
      return this.dialogType === DIALOG_TYPE.READ;
    }
  }
}
</script>

<style></style>