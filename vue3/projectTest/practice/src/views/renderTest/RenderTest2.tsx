import { defineComponent, h, ref, withModifiers } from 'vue';
import RenderTest2_1 from './RenderTest2_1';
import RenderTest2_2 from './RenderTest2_2';

export default defineComponent({
  setup() {
    const showItem = ref(true);
    const times = ref(0);
    return () => [
      h('h3', '事件绑定'),
      h('hr'),
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
      h(
        'div',
        {
          onClick: () => {
            console.log('触发了 div 的 click');
          },
        },
        [
          h(RenderTest2_2, {
            onBtnClick: () => {
              // 这个事件只会触发一次
              times.value++;
            },
            onBtnClicks: () => {
              times.value++;
            },
            onBtnClicksOnce: () => {
              // 即使是组件内部抛出的事件也可以这种写法来实现 .once .capture .passive
              times.value++;
            },
            onClick: withModifiers(() => {
              console.log('点击了组件 并且停止了事件传递');
            }, ['stop']),
            /* 
            onClickStop: () => {
              // stop 修饰符是不支持这么写的
              console.log('点击了组件 并且停止了事件传递');
            }, */
          }),
          h('div', `子组件触发了${times.value}次点击事件`),
        ]
      ),
    ];
  },
});
