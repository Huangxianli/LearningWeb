import SlotTest2_1 from "./SlotTest2_1.js";
const SlotTest2_0 = {
  name: 'SlotTest2_0',
  components: {
    SlotTest2_1
  },
  render (h) {
    return h(SlotTest2_1, {
      scopedSlots: {
        listItemContent: props => h('div', { class: 'slot-test-2__list-item-value' }, props.listItemInfo.value)
      },
      on: {
        'my-input-event': () => {
          console.log('执行了my-input-event');
        }
      }
    }
    )
  }
};
export default SlotTest2_0;