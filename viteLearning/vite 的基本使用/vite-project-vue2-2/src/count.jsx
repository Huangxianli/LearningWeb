export default {
  name: 'CountJSX',
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addCount() {
      this.count++;
    },
  },
  render() {
    return (
      <div>
        <div>{this.count}</div>
        <button onClick={this.addCount}>增加</button>
      </div>
    );
  },
};
