import { defineComponent, h } from 'vue';
// import { withModifiers } from 'vue';
import type { VNode } from 'vue';

export default defineComponent({
  emits: {
    btnClick: () => {
      true;
    },
  },
  setup(_, { emit }) {
    return (): VNode =>
      h('div', null, [
        h(
          'button',
          {
            // 注意只有 .once passive capture 才支持这种写法
            onClickOnce: () => {
              // 加了 Once，改事件只会触发一次
              emit('btnClick');
            },
            // onClick: withModifiers(() => {
            //   emit('btnClick');
            // }, ['once']),
            //  注意 .none .capture .passive 不支持传入到 withModifiers 的第二个参数里面
          },
          '只触发一次点击事件的按钮'
        ),
      ]);
  },
});
