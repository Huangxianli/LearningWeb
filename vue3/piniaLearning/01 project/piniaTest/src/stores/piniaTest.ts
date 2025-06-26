import { defineStore } from 'pinia';
import type { Component } from 'vue';
import { defineAsyncComponent } from 'vue';

export type PiniaTestListItem = {
  id: number;
  name: string;
  discription: string;
  component: Component | null;
};

/**
 * @function defineStore
 * @description 定义个一个 store
 * @param {id} 唯一标识
 * @param {option | setup 函数} Store 对应的 state、getters、actions，如果是 setup 函数，其中 ref() 是 state、computed() 是 getters、function() 是 actions，setup 需要手动的 return，注意，只要是响应式变量，就一定要返回，如果是非响应式对象可以不返回，如果是 setup 的写法，可以在 store 中自由的使用任何组合式函数，例如 watch 这些，如果是 options 的写法的话，不能直接使用 watch 选项，但是可以通过 this。$watch() 来进行监听
 * @returns {Store} 最好是以 use 开头 Store 结尾
 */
export const usePiniaTestStore = defineStore('piniaTest', () => {
  const testList: PiniaTestListItem[] = [
    {
      id: 1,
      name: 'piniaTest1',
      discription: 'pinia 的第一个用例',
      component: null,
    },
    {
      id: 2,
      name: 'piniaTest2',
      discription: '登录登出 pinia 验证',
      component: defineAsyncComponent(() => import('@/views/piniaTest/LoginPiniaTest.vue')),
    },
    {
      id: 3,
      name: 'piniaTest3',
      discription: '表格',
      component: defineAsyncComponent(() => import('@/views/piniaTest/TableFilterTest.vue')),
    },
  ];

  type GetDetailInfoById = (id: number) => PiniaTestListItem | undefined;
  const getDetailInfoById: GetDetailInfoById = (id) => {
    return testList.find((item) => item.id === id);
  };
  return {
    testList,
    getDetailInfoById,
  };
});
