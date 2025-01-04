<template>
  <div>
    <el-form :model="form">
      <el-row :gutter="8">
        <my-form-item label="nameasd" prop="name" showLabelTipIcon labelTipInfo="12312321sdadeqwx"
          :rules="[{ required: true, trigger: 'blur' }]">
          <el-input v-model="form.name" />
        </my-form-item>
        <my-form-item label="sex" prop="sex">
          <el-input v-model="form.name" />
        </my-form-item>
        <my-form-item label="nameasd" prop="age" :layout="{ inline: true }">
          <el-input v-model="form.age" />
        </my-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MyFormItem from '@/components/my-form/MyFormItem.vue'
export default {
  components: {
    MyFormItem,
  },
  data () {
    return {
      form: {
        name: '',
        age: '',
        sex: ''
      }
    }
  }
}
</script>

<style></style>