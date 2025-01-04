<template>
  <div class="test-view-main">
    <component :is="componentName"></component>
  </div>
</template>

<script>
import LayoutTest from '@/components/LayoutTest.vue';
import RadioTest from '@/views/RadioTest.vue';
import CheckboxTest from '@/views/CheckboxTest.vue';
import InputTest from '@/views/InputTest.vue';
import FormTest from '@/views/FormTest.vue';
import TableTest from '@/views/tableTest'
import MyFormItemTest from '@/views/MyFormItemTest.vue';
import RenderTest from '@/views/renderTest/RenderTest.vue';
import SlotTest from '@/views/slotTest/SlotTest.vue';
import routerMap from '@/utils/testViewMap.js';

export default {
  components: {
    LayoutTest,
    RadioTest,
    CheckboxTest,
    InputTest,
    FormTest,
    TableTest,
    MyFormItemTest,
    RenderTest,
    SlotTest
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

<style scoped>
.test-view-main {
  height: 100%;
  overflow: auto;
}
</style>