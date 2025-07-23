import Vue from 'vue';

import App from './App.vue';

new Vue({
  el: '#app',
  components: {
    App,
  },
  render: (h) => h(App),
  // template: `<App></App>`,
}).$mount();
