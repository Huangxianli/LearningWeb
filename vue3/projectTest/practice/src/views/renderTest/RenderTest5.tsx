import { defineComponent, h, ref } from 'vue';
export default defineComponent({
  setup() {
    const arr = ref(Array.from({ length: 10 }).map((_, index) => index));
    const inputRefs = new Map();
    return () =>
      h('div', [
        ...arr.value.map((item) =>
          h(
            'div',
            { key: item },
            // 注意 key 绑定的位置，这里 arr 如果变化的话，会触发重新渲染，如果这里没有绑定 key，vue 不知道是否该重用这些元素，他就会全部重新渲染，vue 的机制又是先渲染新的再删除旧的，下面的每一个 ref 就会先执行一次 el 为有值的情况，在执行一次 el 为 null 的情况，就会导致 inputRefs 的所有数据都被删除了，导致 ref 获取有问题；但是如果 key 绑定在这里，arr 改变的时候，vue 就知道哪些会被复用，复用的部分就不会执行 el 为 null 的情况
            [
              item,
              h('input', {
                ref: (el) => {
                  if (el) {
                    inputRefs.set(item, el);
                  } else {
                    inputRefs.delete(item);
                  }
                },
              }),
              h('br'),
            ]
          )
        ),
        h(
          'button',
          {
            onClick: () => {
              inputRefs.get(3)?.focus();
            },
          },
          '3聚焦'
        ),
        h(
          'button',
          {
            onClick: () => {
              arr.value.shift();
            },
          },
          '删除1'
        ),
      ]);
  },
});
