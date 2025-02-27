const { ref, onMounted, onBeforeUnmount, watchEffect, toValue } = Vue;

const useMouse = function () {
  const x = ref(0);
  const y = ref(0);
  const updateMouse = event => {
    x.value = event.pageX;
    y.value = event.pageY;
  };
  onMounted(() => { window.addEventListener('mousemove', updateMouse); });
  onBeforeUnmount(() => { window.removeEventListener('mousemove', updateMouse); });

  return { x, y }
};

const useFetch = function (url) {
  const state = ref('');
  const result = ref({});
  setTimeout(() => {
    state.value = 'success';
    result.value = { name: '' };
  }, 3000);
  return { state, result };
};

const useFetch1 = function (url) {
  // 期望 如果 url 是 ref 或者 getter 函数时，url 变化的时候，会重新请求
  const state = ref('');
  const result = ref({});
  const fetchData = function () {
    console.log('执行了 fetchData');
    toValue(url)
    setTimeout(() => {
      state.value = 'success';
      result.value = { name: '' };
    }, 3000);
  };
  watchEffect(() => { fetchData() })


  return { state, result };
}

export { useMouse, useFetch, useFetch1 };