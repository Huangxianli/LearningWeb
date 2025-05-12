<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { User } from './components/types';

import ModelTest1 from './components/ModelTest1.vue';
import ModelTest2 from './components/ModelTest2.vue';
import ModelTest3 from './components/ModelTest3.vue';
import ModelTest4 from './components/ModelTest4.vue';
import ModelTest5 from './components/ModelTest5.vue';

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
  <hr />
  <ModelTest2 v-model:model-name="model2" />
  <hr />
  <ModelTest3 v-model:model-name="model3" />
  <hr />
  <ModelTest4 v-model:model-name1.upper="model4" />
  <hr />
  <ModelTest5 v-model="model5" />
</template>

<style scoped></style>
