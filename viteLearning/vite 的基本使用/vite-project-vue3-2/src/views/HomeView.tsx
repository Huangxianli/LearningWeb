import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const input: Ref<''> = ref('');

    return () => (
      <div>
        input 的内容：{input.value}
        <br />
        <input v-model={input.value} />
      </div>
    );
  },
});
