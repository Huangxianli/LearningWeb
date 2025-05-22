import { h, defineComponent, ref } from 'vue';
import RenderTest6_1 from './RenderTest6_1';

export default defineComponent({
  setup() {
    const model = ref<string>('');
    return () =>
      h('div', null, [
        h(RenderTest6_1, {
          modelValue: model.value,
          'onUpdate:modelValue': (value: string) => {
            model.value = value;
          },
        }),
        `绑定的 model  的值为：${model.value}`,
      ]);
  },
});
