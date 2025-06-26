<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLoginPiniaTestStore } from '@/stores/loginPiniaTest';
const userInfo: Ref<{
  username: string;
  password: string;
}> = ref({
  username: '',
  password: '',
});
const store = useLoginPiniaTestStore();
const { isLogin } = storeToRefs(store);
// 不能直接的解构，要使用 storeToRefs() 包裹一下
isLogin.value = Boolean(localStorage.getItem('login-pinia-test-user'));

if (isLogin.value) {
  userInfo.value.username = JSON.parse(
    localStorage.getItem('login-pinia-test-user') ?? '',
  ).username;
}

const login = (e: Event) => {
  e.preventDefault();
  // 一个 form 只有一个 button 的时候，这个 button 的 type 会默认为 submit，点击后会触发默认事件，刷新页面
  localStorage.setItem('login-pinia-test-user', JSON.stringify(userInfo.value));
  isLogin.value = true;
};
const logout = () => {
  localStorage.setItem('login-pinia-test-user', '');
  isLogin.value = false;
};
</script>

<template>
  <div class="login-pinia-test">
    <div v-if="!isLogin" class="login-container">
      <form>
        <label for="username">账号</label>
        <input v-model="userInfo.username" id="username" type="text" />
        <br />
        <label for="password">密码</label>
        <input v-model="userInfo.password" id="password" type="password" />
        <br />
        <button @click="login">登录</button>
      </form>
    </div>
    <div v-else class="logout-container">
      <div>用户</div>
      <div>{{ userInfo.username }}</div>
      <button @click="logout">登出</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.logout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
