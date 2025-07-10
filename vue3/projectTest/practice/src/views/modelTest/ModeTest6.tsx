import { defineComponent, useModel, type PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue2: {
      type: String,
      reqiured: false,
      default: '',
    },
    modelValue2Modifiers: {
      type: Object as PropType<{
        upper?: true;
        lower?: true;
      }>,
    },
  },
  emits: ['update:modelValue2'],
  setup(props) {
    /* 
    const [modelValue, modifiers] = defineModel<string, 'upper' | 'lower'>(
      'modelValue1',
      {
        type: String,
        required: false,
        get(value) {
          return value;
        },
        set(value) {
          if (modifiers.lower) {
            return value.toLocaleLowerCase();
          }
          if (modifiers.upper) {
            return value.toLocaleUpperCase();
          }
          return value;
        },
      }
    );
 */
    /* 
   defineProps<{
      modelValue2?: string;
      modelValue2Modifiers?: {
        upper?: true;
        lower?: true;
      };
    }>();
    defineEmits(['update:modelValue2']);
 */
    const modelValue2 = useModel(props, 'modelValue2', {
      get(value) {
        return value;
      },
      set(value) {
        if (props.modelValue2Modifiers?.upper) {
          return value?.toLocaleUpperCase();
        }
        if (props.modelValue2Modifiers?.lower) {
          return value?.toLocaleLowerCase();
        }
        return value;
      },
    });

    return () => (
      <>
        <h3>jsx 中的 v-model</h3>
        {/* <input type="text" v-model={modelValue.value} />
        <div>defineModel()：{modelValue.value}</div> */}
        <input v-model={modelValue2.value} />
        <div>useModel()：{modelValue2.value}</div>
      </>
    );
  },
});
