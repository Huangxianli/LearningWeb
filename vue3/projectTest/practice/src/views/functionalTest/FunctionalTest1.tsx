import { type FunctionalComponent, type PropType } from 'vue';

type PropsType = {
  modelValue: string;
  modelModifiers?: {
    upper?: true;
    lower?: true;
  };
};
type EmitType = {
  'update:modelValue': (value: string) => void;
};

const FunctionalTest1: FunctionalComponent<PropsType, EmitType> = (
  props,
  { emit }
) => {
  const setValueByModelMidifiers = (value: string) =>
    props.modelModifiers?.lower
      ? value.toLocaleLowerCase()
      : props.modelModifiers?.upper
      ? value.toLocaleUpperCase()
      : props.modelValue;
  return (
    <>
      <h3>v-model</h3>
      <input
        type="text"
        value={setValueByModelMidifiers(props.modelValue)}
        onInput={(e) => {
          const value = setValueByModelMidifiers(
            (e.target as HTMLInputElement).value
          );
          emit('update:modelValue', value);
        }}
      />
    </>
  );
};

// 运行时信息，例如，这里的 props 声明了的话，就不会是 attrs
FunctionalTest1.props = {
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
    default: {
      upper: false,
      lower: false,
    },
    required: false,
  },
};
FunctionalTest1.emits = {
  'update:modelValue': (value: string): value is string => true,
};

export default FunctionalTest1;
