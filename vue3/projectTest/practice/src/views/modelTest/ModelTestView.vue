<script setup lang="tsx">
import { ref, h } from 'vue';
import type { Ref } from 'vue';
import type { User } from './types';

import ModelTest1 from './ModelTest1.vue';
import ModelTest2 from './ModelTest2.vue';
import ModelTest3 from './ModelTest3.vue';
import ModelTest4 from './ModelTest4.vue';
import ModelTest5 from './ModelTest5.vue';
import MolelTest6 from './ModeTest6';
import ModelTest6_1 from './ModelTest6_1.vue';
import ModelTest7 from './ModelTest7';

const model1: Ref<string> = ref('');
const model1_1: Ref<string> = ref('');
const model2: Ref<string> = ref('');
const model2_1: Ref<string> = ref('');
const model3: Ref<string> = ref('');
const model3_1: Ref<string> = ref('');
const model4: Ref<string> = ref('');
const model4_1: Ref<string> = ref('');
const model5: Ref<User | undefined> = ref({
  id: '1',
  userName: 'name1',
  userAccount: 'account1',
});

const model6: Ref<string> = ref('');
const model6_1: Ref<string> = ref('');
const model6_2: Ref<string> = ref('');
const ModelTest6_1H = () => (
  <>
    <div>
      ModelTest6_1H，注意这里的 modifier 的写法，v-model_modifier
      v-model:modelName_modifier
    </div>
    <ModelTest6_1 v-model:modelValue1_upper={model6_2.value}></ModelTest6_1>
  </>
);

const model7: Ref<string> = ref('');
const ModelTest7H = () =>
  h(ModelTest7, {
    modelValue: model7.value,
    modelModifiers: {
      upper: true,
    },
    'onUpdate:modelValue': (value: string) => {
      model7.value = value;
    },
  });
</script>

<template>
  <el-card>
    <ModelTest1 v-model="model1" v-model:model-value1="model1_1" />
    <div>{{ model1 }}-{{ model1_1 }}</div>
  </el-card>
  <el-card>
    <ModelTest2 v-model:model-name="model2" v-model:modelName1="model2_1" />
    <div>{{ model2 }}-{{ model2_1 }}</div>
    <ModelTest2 />
  </el-card>
  <el-card>
    <ModelTest3 v-model:model-name="model3" v-model:modelName1="model3_1" />
    <div>{{ model3 }}-{{ model3_1 }}</div>
  </el-card>
  <el-card>
    <ModelTest4
      v-model:model-name1.upper="model4"
      v-model:modelName2.upper="model4_1"
    />
    <div>{{ model4 }}-{{ model4_1 }}</div>
  </el-card>
  <el-card>
    <div>{{ model5 }}</div>
    <ModelTest5 v-model="model5" />
  </el-card>
  <el-card>
    <MolelTest6 v-model:modelValue2="model6"></MolelTest6>
    <ModelTest6_1 v-model:modelValue1.upper="model6_1"></ModelTest6_1>
    <ModelTest6_1H></ModelTest6_1H>
  </el-card>
  <el-card>
    <ModelTest7H />
    <div>model7：{{ model7 }}</div>
  </el-card>
</template>

<style scoped></style>
