<script lang="tsx">
// 注意这里没有 setup 不然就不能导出了
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HomeView1',
  setup() {
    const input = ref('');

    return () => (
      <>
        input 绑定的值：{input.value}
        <br />
        <input v-model={input.value} type="text" />
      </>
    );
  },
});
</script>

<style scoped></style>
