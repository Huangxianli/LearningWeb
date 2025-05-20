/* export default function  HelloJsx() {
  return (
    <div>
      Hello Jsx
    </div>
  )
} */

/* import { h } from 'vue';
export default function HelloJsx() {
  return h('div', 'hello Jsx');
} */

/* import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HelloJsx',
  setup() {
    return () => <div>hello jsx</div>;
    // 注意，在 setup 中 return 的如果是 jsx 的话，要使用 retrun () => (jsx content)
  },
}); */

export default () => <div>hello jsx1</div>;
