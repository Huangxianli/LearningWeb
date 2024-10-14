<template>
  <div>
    <slot>
      <SlotTest2 />
    </slot>
    <slot name='content' :content="row">
    </slot>
  </div>
</template>

<script>
import SlotTest2 from './SlotTest2.vue';
export default {
  components: {
    SlotTest2,
  },
  data () {
    return {
      row: 'data'
    };
  },
  mounted () {
    console.log(this.$slots); // {default: [VNode]} 如果只有传入插槽的内容发生了改变，那么this.$slot是不会变的，因为this.$slot不是响应式的
    console.log(this.$scopedSlots.content()); // [VNode]
  },

}
</script>

<style></style>