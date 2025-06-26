import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useLoginPiniaTestStore = defineStore('loginPiniaTest', () => {
  const isLogin = ref(false);
  const setIsLogin = (value: boolean) => {
    isLogin.value = value;
  };
  return {
    isLogin,
    setIsLogin,
  };
});
