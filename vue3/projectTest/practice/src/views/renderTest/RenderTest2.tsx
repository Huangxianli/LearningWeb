import { defineComponent, h, ref } from 'vue';
import RenderTest2_1 from './RenderTest2_1';
import RenderTest2_2 from './RenderTest2_2';

export default defineComponent({
  setup() {
    const showItem = ref(true);
    const times = ref(0);
    return () => [
      h('div', null, [
        h(RenderTest2_1, {
          onShowChange: (show) => {
            showItem.value = show;
          },
        }),
        h(
          'div',
          null,
          showItem.value ? '子组件显示了内容' : '子组件隐藏了内容'
        ),
      ]),
      h('hr'),
      h('div', null, [
        h(RenderTest2_2, {
          onBtnClick: () => {
            // 这个事件只会触发一次
            times.value++;
          },
        }),
        h('div', `子组件触发了${times.value}次点击事件`),
      ]),
    ];
  },
});
