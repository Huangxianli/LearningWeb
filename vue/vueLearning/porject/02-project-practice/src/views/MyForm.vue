<template>
  <el-form :model="form" :rules="rules" ref="form" @validate="validate">
    <my-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </my-form-item>

    <my-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </my-form-item>
  <el-button @click="click">点击按钮</el-button>

  </el-form>
</template>

<script>
import MyFormItem from './MyFormItem.vue';

export default {
  components: {
    MyFormItem
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: this.validateField, trigger: 'blur' }
        ],
        password: [
          { validator: this.validateField, trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
    this.$on('validate', ()=> {
    })
  },
  methods: {
    validateField (rule, value, callback)  {
      if (value === '') {
        callback(new Error('请输入内容'));
      } else {
        callback();
      }
    },
    click() {
      this.$refs.form.validate()
    },
    validate(...aaa){
      console.log(aaa);
    }
  },
  
};
</script>