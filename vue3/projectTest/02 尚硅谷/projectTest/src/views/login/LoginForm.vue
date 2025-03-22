<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  username: '',
  password: '',
  remember: false
});
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
};

const loginFormRef = ref();
const login = async () => {
  try {
    await loginFormRef.value.validate();
    router.replace({ name: 'home' });
  } catch (err) {
    console.log(err);
  }
};
const goToSignUp = () => {
  router.push({
    name: 'signUp'
  })
};
</script>

<template>
  <el-card>
    <el-form ref="loginFormRef" label-width="auto" :model="formData" :rules="rules">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="formData.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formData.remember">
        </el-checkbox>记住密码
      </el-form-item>
      <div class="btn-group">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="goToSignUp">注册</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped>
.btn-group {
  display: flex;
  justify-content: center;
}
</style>