const ChildComponent = {
  props: {
    fatherClicks: 0
  },
  data () {
    return {
      clicks: 0, // 如果没有应用在dom上，改变不会触发更新的回调函数
    }
  },
  beforeCreate () {
    console.log('===子：beforeCreate==============');
  },
  created () {
    console.log('===子：created==============');
  },
  beforeMount () {
    console.log('===子：beforeMount==============');
  },
  mounted () {
    console.log('===子：mounted==============');
  },
  beforeUpdate () {
    console.log('===子：BeforeUpdate==============');
  },
  updated () {
    console.log('===子：updated==============');
  },
  beforeDestroy () {
    console.log('===子：beforDistory==============');
  },
  destroyed () {
    console.log('===子：distoryed==============');
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
        '子点击触发组件的更新' + this.clicks
      ),
      h('div', '父已经点击了' + this.fatherClicks)
    ]);
  }
};
export default ChildComponent;