import ChildComponent from './childComponent.js'

const FatherComponent = {
  components: {
    ChildComponent
  },
  data () {
    return {
      clicks: 0, // 如果没有应用在dom上，改变不会触发更新的回调函数
      temp: 1,
    }
  },
  beforeCreate () {
    console.log('---父：beforeCreate-------------');
  },
  created () {
    console.log('---父：created-------------');
    setTimeout(() => {
      this.temp = this.temp + 1;
    }, 2000);
  },
  beforeMount () {
    console.log('---父：beforeMount-------------');
  },
  mounted () {
    console.log('---父：mounted-------------');
  },
  beforeUpdate () {
    console.log('---父：BeforeUpdate-------------');
    debugger
  },
  updated () {
    console.log('---父：updated-------------');
    debugger
  },
  beforeDestroy () {
    console.log('---父：beforDistory-------------');
  },
  destroyed () {
    console.log('---父：distoryed-------------');
  },
  methods: {
    handlerClick () {
      this.clicks++;
    }
  },
  render (h) {
    return h('div', [
      h('button', {
        on: {
          click: this.handlerClick
        },

      },
        '点击触发组件的更新' + this.clicks
      ),
      h(ChildComponent, {
        attrs: {
          fatherClicks: this.clicks
        }
      })
    ]);
  }
};
export default FatherComponent;