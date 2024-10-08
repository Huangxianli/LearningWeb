import Vue, { } from 'vue';
const TestTs = Vue.extend({
  data: () => ({
    clicks: 0
  }),
  methods: {
    clickBtn() {
      this.clicks++;
    },
  },
  template: `
    <div>
     <button @click="clickBtn">点击按钮</button>
     <div>点击了几次：{{clicks}}</div>
    </div>
  `,
});
export default TestTs;