export default {
  props: ['title'], // 使用的不是 <script setup>，所以这里需要使用 props 来声明接收的参数
  // emits: ['myClick'], // 使用的不是 <script setup>，也不是直接在 template 中 $emit，所以这里需要使用 emits 来声明派发的事件；但是实际上写不写好像都可以，主要是提供类型检查等功能
  setup(props, ctx) {
    const handleClick = (e) => {
      ctx.emit('myClick', e);
    };
    return {
      props,
      handleClick,
    };
  },
  template: `
    <input @input="$emit('myInput', $event)"/>
    <button @click="handleClick">点击</button>
    <br />
    {{props.title}}-{{title}}
  `,
};
