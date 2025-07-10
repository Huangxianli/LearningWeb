import { defineComponent } from 'vue';
import JSXTest5_1 from './JSXTest5_1';

export default defineComponent({
  setup() {
    return () => (
      <>
        <h3>h 函数</h3>
        <JSXTest5_1></JSXTest5_1>
      </>
    );
  },
});
