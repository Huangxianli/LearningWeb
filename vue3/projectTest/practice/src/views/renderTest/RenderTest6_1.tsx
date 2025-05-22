import { h } from 'vue';
import type { FunctionalComponent } from 'vue';

// 开发时校验
type FComponentProps = {
  modelValue: string;
};
type FComponentEvent = {
  'update:modelValue': (value: string) => void;
};

// 注意函数式组件内部没有声明周期，没有内部的状态，如果不需要使用功能，函数式组件是更好的选择，新能更加的好
const RenderTest6_1: FunctionalComponent<FComponentProps, FComponentEvent> = (
  props,
  { emit }
) => {
  let isComposing = false;
  return h('input', {
    value: props.modelValue,
    onInput: (e: Event) => {
      if (isComposing) return;
      emit('update:modelValue', (e.target as HTMLInputElement).value);
    },
    onCompositionstart: () => {
      isComposing = true;
    },
    onCompositionend: (e: Event) => {
      isComposing = false;
      emit('update:modelValue', (e.target as HTMLInputElement).value);
    },
  });
};

// 运行时校验
RenderTest6_1.props = {
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
};
RenderTest6_1.emits = {
  'update:modelValue': (value: string): value is string => true,
};
export default RenderTest6_1;
