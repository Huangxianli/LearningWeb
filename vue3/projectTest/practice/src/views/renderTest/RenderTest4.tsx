import { defineComponent, h, ref } from 'vue';
import type { Ref } from 'vue';
import RenderTest4_1 from './RenderTest4_1';
export default defineComponent({
  setup() {
    const modelValue: Ref<string> = ref('');
    const model1: Ref<string> = ref('');

    return () =>
      h('div', null, [
        h(RenderTest4_1, {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (value) => {
            modelValue.value = value;
          },
          model1: model1.value,
          model1Modifiers: {
            upper: true,
          },
          'onUpdate:model1': (value) => {
            model1.value = value;
          },
        }),
        h('br'),
        h('br'),
        h('br'),
        h('div', null, `input 事件 modelValue 的内容：${modelValue.value}`),
        h('div', null, `change 事件 model1 的内容：${model1.value}`),
      ]);
  },
});
