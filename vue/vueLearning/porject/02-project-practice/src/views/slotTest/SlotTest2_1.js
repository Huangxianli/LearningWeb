import './slotTest2_1.css';

const SlotTest2_1 = {
  name: 'SlotTest2_1',
  data () {
    return {
      inputValue: '',
      listData: [{
        key: 0,
        value: '第一个',
        date: new Date().toLocaleDateString(),
      }],
    }
  },
  computed: {
    addDisabled () {
      return !this.inputValue;
    }
  },
  methods: {
    inputhandler (e) {
      this.inputValue = e.target.value;
      this.$emit('my-input-event');
    },
    addHandler () {
      this.listData.push({
        key: this.listData.length ? this.listData[this.listData.length - 1].key + 1 : 0,
        value: this.inputValue,
        date: new Date().toLocaleDateString(),
      });
      this.inputValue = '';
    },
  },
  render (h) {
    return h('div', { 'class': 'slot-test-2' }, [
      h('div', [
        h('input', {
          class: 'slot-test-2__input-add',
          attrs: {
            type: 'text',
            placeholder: '请输入要加入列表的内容'
          },
          domProps: {
            value: this.inputValue,
          },
          on: {
            input: this.inputhandler
          }
        }),
        h('button', {
          attrs: {
            disabled: this.addDisabled,
          },
          on: {
            click: this.addHandler
          }
        },
          '添加'
        )]
      ),
      h('ul', {
        class: 'slot-test-2__list-context',
      },
        this.listData.map(listItem => (
          h('li', {
            key: listItem.key,
            class: 'slot-test-2__list-item'
          },
            this.$scopedSlots.listItemContent ? this.$scopedSlots.listItemContent({ listItemInfo: listItem }) : [
              h('span', { class: 'slot-test-2__list-item-value' }, listItem.value),
              h('span', { class: 'slot-test-2__list-item-time' }, listItem.date)
            ]
          )
        ))
      ),
    ]);
  }

};
export default SlotTest2_1;