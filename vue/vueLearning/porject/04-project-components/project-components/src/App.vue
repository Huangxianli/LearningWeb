<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Store } from '@/components1/store';
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
    let a = new Store();
    console.log(a);
    a.data = [1, 2];
    console.log(a);
  }
}
</script>

<style></style>
