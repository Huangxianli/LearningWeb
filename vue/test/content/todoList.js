

Vue.component("todoList", {
  data () {
    return {
      listArr: [{
        name: "aaa",
      },
      {
        name: "bbb"
      }],
      inputValule: "",
      className: "not_show"
    }
  },
  methods: {
    inputChange (e) {
      this.inputValule = e.target.value ?? "";
      if (this.inputValule.length !== 0) {
        this.className = "not_show"
      }
    },
    addItem () {
      if (this.inputValule.length === 0) {
        this.className = "show";
        return
      }
      this.listArr.push({ name: this.inputValule });
      this.inputValule = "";
    },
    deleteItem () {
      this.listArr.pop();
    },
  },
  template: // 有且只能有一个根节点包裹住内容
    `
    <div> 
      <ol>
        <todo-item v-for="(item, index) in listArr" :list-info="item" :key="index">
        </todo-item>
      </ol>
      <div>
        <input type="text" id="addInput" @input="inputChange($event)" :value="inputValule" />
        <button @click="addItem">增加</button>
        <button @click="deleteItem">减少最后一个</button>
      </div>
      <span style="color: red;" :class="className">请先输入要添加的内容</span>
    </div>
    `
});

Vue.component("todoItem", {
  props: {
    listInfo: { // 这里要注意 html中的attribute是大小写不敏感的 会将大写转化为小写， 在使用DOM模板时，camelCase 的 prop名要使用等价的kebab-case命名
      // <todoo-item :list-info="ddd"> 要这样写，但是如果使用的字符串模板，这个限制就不存在
      type: Object,
      required: true,
      default: () => { }
    }
  },
  template: `<li>{{listInfo.name}}</li>`
});



