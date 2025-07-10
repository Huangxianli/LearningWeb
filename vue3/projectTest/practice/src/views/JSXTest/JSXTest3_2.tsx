import { defineComponent, useModel, type PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    model1: {
      type: String,
      default: '',
    },
    model1Modifiers: {
      type: Object as PropType<{ upper?: true }>,
      default: () => ({}),
    },
  },
  emits: {
    'update:modelValue': (value: string): value is string => true,
    'update:model1': (value: string): value is string => true,
  },
  setup(props, ctx) {
    const modelValue = useModel(props, 'modelValue');
    const model1 = useModel(props, 'model1', {
      get(value) {
        return value;
      },
      set(value) {
        let tempValue = value;
        if (props.model1Modifiers.upper) {
          tempValue = value.toUpperCase();
        }
        ctx.emit('update:model1', tempValue);
        return tempValue;
      },
    });
    return () => (
      <>
        <input type="text" v-model={modelValue.value} />
        <br />
        <input type="text" v-model={model1.value} />
      </>
    );
  },
});
