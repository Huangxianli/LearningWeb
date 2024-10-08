<template>
  <div>
    <component :is="componentName"></component>
  </div>
</template>

<script>
import RadioTest from '@/views/RadioTest.vue';
import CheckboxTest from '@/views/CheckboxTest.vue';
import InputTest from '@/views/InputTest.vue';
import FormTest from '@/views/FormTest.vue';
import LayoutTest from '@/components/LayoutTest.vue';
import MyFormItemTest from '@/views/MyFormItemTest.vue';

import routerMap from '@/utils/testViewMap.js';

export default {
  components: {
    RadioTest,
    CheckboxTest,
    InputTest,
    FormTest,
    LayoutTest,
    MyFormItemTest,
  },
  props: {
    compName: {
      type: String,
      default: '',
      required: true,
    },
  },
  computed: {
    componentName () {
      return routerMap.get(this.compName)?.componentName;
    },
  },
}
</script>

<style></style>