import { defineComponent, h } from 'vue';
import type { Model1Modifires } from './types';
import type { PropType } from 'vue';
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    model1: {
      type: String,
      required: true,
    },
    model1Modifiers: {
      type: Object as PropType<Model1Modifires>,
      default: () => ({}),
    },
  },
  emits: {
    'update:modelValue': (value: string): value is string => true,
    'update:model1': (value: string): value is string => true,
  },
  setup(props, { emit }) {
    let isComposing: boolean = false;
    return () =>
      h('div', null, [
        'input 事件触发',
        h('input', {
          value: props.modelValue,
          onInput: (e: Event) => {
            if (isComposing) {
              return;
            }
            emit('update:modelValue', (e.target as HTMLInputElement).value);
          },
          // 添加 onCompositionstart 和 onCompositionend 事件是为了在输入中文拼音的过程中，不更新绑定的 model 的值，和 vue 处理的 input[type="text"] 的表现一样
          onCompositionstart: () => {
            // 开始输入拼音
            isComposing = true;
          },
          onCompositionend: (e: Event) => {
            // 选中中文，触发了这个事件，不会接连着触发 input，所以要添加一个值
            isComposing = true;
            emit('update:modelValue', (e.target as HTMLInputElement).value);
          },
        }),
        h('br'),
        'change 触发',
        h('input', {
          value: props.model1,
          onChange: (e: Event) => {
            let value = (e.target as HTMLInputElement).value;
            value = props.model1Modifiers.upper ? value.toUpperCase() : value;
            emit('update:model1', value);
          },
        }),
      ]);
  },
});
