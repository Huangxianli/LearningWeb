import { defineComponent, h, ref, useTemplateRef } from 'vue';
export default defineComponent({
  setup() {
    const arr = ref(Array.from({ length: 10 }).map((_, index) => index));
    const inputRefs: Map<number, HTMLInputElement> = new Map();
    // 像这种 循环中的 refDOM 在 h 函数中不支持平常的 ref 的写法

    const inputRef1 = ref<HTMLInputElement | null>(null);
    // 注意这里的参数是 null

    const inputRef2 = useTemplateRef<HTMLInputElement>('inputRef2');

    return () => [
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
                  console.log('key el', item, ' ', el);
                  if (el) {
                    inputRefs.set(item, el as HTMLInputElement);
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
              arr.value.splice(1, 1);
            },
          },
          '删除第二个'
        ),
      ]),
      h('input', {
        ref: inputRef1, // 使用 ref() 这里是 ref 变量
      }),
      h(
        'button',
        {
          onClick: () => {
            inputRef1.value!.focus();
          },
        },
        '聚焦当前 input'
      ),
      h('br'),
      h('input', {
        ref: 'inputRef2', // 使用 useTemplateRef，这里是字符串，
      }),
      h(
        'button',
        {
          onClick: () => {
            inputRef2.value!.focus();
          },
        },
        '聚焦当前 input'
      ),
    ];
  },
});
