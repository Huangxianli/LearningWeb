export default {
  props: {
    content: {
      type: String,
      default: '',
      requried: false,
      validator: data => typeof data === 'string',
    }
  },
  render (h) {
    return h(
      'div',
      {
        class: "over-show-component"
      },
      [
        h('input',
          {
            class: "over-show-component-checkbox",
            domProps: {
              type: 'checkbox'
            }
          }
        ),
        this.$scopedSlots.default ? this.$scopedSlots.default() : this.content
      ]
    )
  }
}