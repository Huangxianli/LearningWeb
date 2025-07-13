import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import type { JSXTest3Event } from './types';

import JSXTest3_1 from './JSXTest3_1';
import JSXTest3_2 from './JSXTest3_2';

export default defineComponent({
  setup() {
    const model: Ref<string> = ref('');
    const updateModelValue: JSXTest3Event['update:modelValue'] = (value) => {
      model.value = value;
    };

    const model2_1 = ref<string>('');
    const model2_2 = ref<string>('');
    return () => (
      <>
        <h3>v-model</h3>
        <JSXTest3_1
          modelValue={model.value}
          modelModifiers={{ upper: true }}
          onUpdate:modelValue={updateModelValue}
        ></JSXTest3_1>
        <JSXTest3_1 v-model_upper={model.value}></JSXTest3_1>
        {/* 这里两种写法是一样的 */}
        <div>绑定的值：{model.value}</div>

        <JSXTest3_2
          v-model={model2_1.value}
          v-model:model1_upper={model2_2.value}
        ></JSXTest3_2>
        <div>{model2_1.value}</div>
        <div>{model2_2.value}</div>
      </>
    );
  },
});
