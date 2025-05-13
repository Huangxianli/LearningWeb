<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { User } from './types';

import ModelTest1 from './ModelTest1.vue';
import ModelTest2 from './ModelTest2.vue';
import ModelTest3 from './ModelTest3.vue';
import ModelTest4 from './ModelTest4.vue';
import ModelTest5 from './ModelTest5.vue';

const model1: Ref<string> = ref('');
const model2: Ref<string> = ref('');
const model3: Ref<string> = ref('');
const model4: Ref<string> = ref('');
const model5: Ref<User | undefined> = ref({
  id: '1',
  userName: 'name1',
  userAccount: 'account1',
});
</script>

<template>
  <ModelTest1 v-model="model1" />
  <ModelTest2 v-model:model-name="model2" />
  <ModelTest3 v-model:model-name="model3" />
  <ModelTest4 v-model:model-name1.upper="model4" />
  <ModelTest5 v-model="model5" />
</template>

<style scoped></style>
