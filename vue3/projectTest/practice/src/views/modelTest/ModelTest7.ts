import { defineComponent, h, ref, watch, type PropType } from 'vue';
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
      required: false,
    },
    modelModifiers: {
      type: Object as PropType<{
        upper?: true;
        lower?: true;
      }>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const text = ref<string>('');
    const setTextValue = (value: string) => {
      let newValue = value;
      if (props.modelModifiers?.upper) {
        newValue = value.toLocaleUpperCase();
      }
      if (props.modelModifiers?.lower) {
        newValue = value.toLocaleLowerCase();
      }
      text.value = newValue;
    };

    watch(
      () => props.modelValue,
      (value) => {
        setTextValue(value);
      },
      {
        immediate: true,
      }
    );
    const inputHandler = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      setTextValue(value);
      emit('update:modelValue', text.value);
    };
    return () =>
      h('div', {}, [
        h('h3', 'h 函数的写法'),
        h('input', {
          value: text.value,
          onInput: inputHandler,
        }),
        h('div', ['modelValue：', text.value]),
      ]);
  },
});
