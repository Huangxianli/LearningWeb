<template>
  <MainContentBoxVue>
    <DDOperationalMetrics />
    <DDOutputValueVue />
  </MainContentBoxVue>
</template>

<script>
import MainContentBoxVue from '@/components/MainContentBox.vue';
import DDOperationalMetrics from './DDOperationalMetrics.vue';
import DDOutputValueVue from './DDOutputValue.vue';
export default {
  components: {
    MainContentBoxVue,
    DDOperationalMetrics,
    DDOutputValueVue,
  }
}
</script>

<style scoped></style>