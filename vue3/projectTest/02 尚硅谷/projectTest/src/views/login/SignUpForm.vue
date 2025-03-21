<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter();

enum GetCodeState {
  NOT_GOT = 0,
  GETTING = 1,
  GOT = 2,
};

const formData = ref({
  username: '',
  phoneNumber: '',
  password: '',
  password2: '',
  validCode: '',
});
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  validCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  password2: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

const getCodeBtnText = computed(() => {
  return gotCodeSatate.value === GetCodeState.GOT ?
    `${time.value}秒后可重新获取` :
    gotCodeSatate.value === GetCodeState.NOT_GOT ?
      '获取验证码' :
      '获取中';
});
const gotCodeSatate = ref(GetCodeState.NOT_GOT);
const time = ref(0);
const getValidCode = () => {
  // 获取验证码
  gotCodeSatate.value = GetCodeState.GETTING;
  setTimeout(() => {
    gotCodeSatate.value = GetCodeState.GOT;
    ElMessage({
      message: '验证码已发送，请注意查收',
      grouping: true,
      type: 'success',
    })
    time.value = 5;
    const timer = setInterval(() => {
      time.value--;
      if (time.value <= 0) {
        clearInterval(timer);
        gotCodeSatate.value = GetCodeState.NOT_GOT;
      }
    }, 1000);
  }, 5000);
};

const signUpFormRef = ref();
const signUpClick = async () => {
  try {
    await signUpFormRef.value.validate();
    console.log('注册成功');
    router.push({
      name: 'login',
    });
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <el-card>
    <el-form ref="signUpFormRef" :model="formData" label-width="auto" :rules="rules">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="phoneNumber" label="手机号">
        <el-input v-model="formData.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item prop="validCode" label="验证码">
        <el-input v-model="formData.validCode">
          <template #append>
            <el-button :disabled="gotCodeSatate !== GetCodeState.NOT_GOT" class="valid-code-btn"
              :loading="gotCodeSatate === GetCodeState.GETTING" @click="getValidCode">{{
                getCodeBtnText }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" show-password v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item prop="password2" label="确认密码">
        <el-input type="password" show-password v-model="formData.password2"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" @click="signUpClick">注册</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.btn-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.valid-code-btn {
  width: 140px;
}
</style>