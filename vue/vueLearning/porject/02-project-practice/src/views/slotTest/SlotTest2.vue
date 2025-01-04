<template>
  <div class='slot-test-2'>
    <div>
      <input type="text" placeholder="请输入要加入列表的内容" class="slot-test-2__input-add" :value="inputValue"
        @input="inputhandler">
      <button :disabled="addDisabled" @click="addHandler">添加</button>
    </div>
    <ul class="slot-test-2__list-context">
      <li v-for="listItem in listData" :key="listItem.key" class="slot-test-2__list-item">
        <slot name="listItemContent" :listItemInfo="listItem">
          <span class="slot-test-2__list-item-value">{{ listItem.value }}</span>
          <span class="slot-test-2__list-item-time">{{ listItem.date }}</span>
        </slot>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  data () {
    return {
      inputValue: '',
      listData: [{
        key: 0,
        value: '第一个',
        date: new Date().toLocaleDateString()
      }]
    };
  },
  computed: {
    addDisabled () {
      return !this.inputValue;
    }
  },
  methods: {
    inputhandler (e) {
      this.inputValue = e.target.value;
    },
    addHandler () {
      this.listData.push({
        key: this.listData.length ? this.listData[this.listData.length - 1].key + 1 : 0,
        value: this.inputValue,
        date: new Date().toLocaleDateString(),
      });
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>
.slot-test-2 .slot-test-2__input-add {
  margin-right: 8px;
}

.slot-test-2 .slot-test-2__list-context {
  list-style-type: none;
  padding: 0;
}

.slot-test-2 .slot-test-2__list-context .slot-test-2__list-item {
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.slot-test-2__list-item-value {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
}

.slot-test-2__list-item-time {
  width: 100px;
  color: gray;
}
</style>