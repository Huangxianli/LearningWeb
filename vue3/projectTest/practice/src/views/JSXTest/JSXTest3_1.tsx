import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { ModelValueModifiers } from './types';

// 注意在 jsx 中不能直接使用 v-model 要自己进行拆分
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
      required: true,
    },
    modelValueModifiers: {
      type: Object as PropType<ModelValueModifiers>,
      default: () => ({}),
    },
  },
  /* 
  emits: {
    'update:modelValue': (value: string): value is string => true,
    'update:model': (value: number): value is number => true,
  },
 */
  emits: ['update:modelValue', 'model'],
  setup(props, { emit }) {
    let isComposing = false;
    const compositionstartHandler = () => {
      isComposing = true;
    };
    const inputHandler = (e: Event) => {
      if (isComposing) return;
      let value = (e.target as HTMLInputElement).value;
      if (props.modelValueModifiers.upper) {
        value = value.toLocaleUpperCase();
      }
      emit('update:modelValue', value);
    };
    const compositionendHandler = (e: Event) => {
      isComposing = false;
      let value = (e.target as HTMLInputElement).value;
      if (props.modelValueModifiers.upper) {
        value = value.toLocaleUpperCase();
      }
      emit('update:modelValue', value);
    };

    return () => (
      <>
        <input
          value={props.modelValue}
          onCompositionstart={compositionstartHandler}
          onInput={inputHandler}
          onCompositionend={compositionendHandler}
        />
      </>
    );
  },
});
