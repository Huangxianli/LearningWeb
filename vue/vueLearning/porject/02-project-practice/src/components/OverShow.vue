<template>
  <div :class="{ 'over-show': true, 'over-show-class': overShowClass }" ref="overShowContent">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    line: {
      type: Number,
      default: 2,
      required: false,
    }
  },
  data () {
    return {
      overShowContent: null,
      resizeObserverData: null,
      overShowClass: false,
    };
  },
  mounted () {
    if ('ResizeObserver' in window) {
      this.resizeObserverData = new ResizeObserver(() => {
        const lineHeight = 29;
        const maxHeight = lineHeight * this.line;
        if (this.$refs.overShowContent.scrollHeight > maxHeight) {
          this.overShowClass = true;
        } else {
          this.overShowClass = false;
        }
      });
      this.resizeObserverData.observe(this.$refs.overShowContent);
    }

  },
  beforeDestroy () {
    this.resizeObserverData.unobserve(this.$refs.overShowContent);

  }
  // const element = document.querySelector('.my-element');

  // const resizeObserver = new ResizeObserver((entries) => {
  //   for (let entry of entries) {
  //     console.log('Element size changed:', entry.contentRect);
  //     // 你可以在这里处理元素大小变化的逻辑
  //   }
  // });

  // // 开始监听元素的大小变化
  // resizeObserver.observe(element);

  // // 停止监听元素的大小变化
  // // resizeObserver.unobserve(element);
}
</script>

<style scoped>
.over-show {
  word-break: break-all;
  overflow-wrap: break-word;
}

.over-show.over-show-class {
  max-height: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
}

.over-show.over-show-class::after {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>