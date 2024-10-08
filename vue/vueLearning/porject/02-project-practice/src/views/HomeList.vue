<template>
  <ul>
    <li
      v-for="{ label, key, compName } in list"
      :key="key"
      @click="gotoPage(compName)"
    >
      {{ label }}
    </li>
  </ul>
</template>

<script>
import routerMap from '@/utils/testViewMap.js';
export default {
  data () {
    return {
    };
  },
  computed: {
    list () {
      const list = [];
      for (let [, value] of routerMap) {
        const data = {
          label: value.name,
          key: value.name,
          compName: value.compName,
        };
        list.push(data);
      }
      return list;
    },
  },
  methods: {
    gotoPage (compName) {
      this.$router.push({
        name: 'testComponent',
        params: { compName }
      })
    },
  }
}
</script>

<style>
</style>