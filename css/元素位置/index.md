# 元素位置

## offsetLeft 和 offsetTop

`element.offsetLeft` 表示元素*左上角*相对于其最近已经定位（position: realative | absolut | fixed）的上级元素（直到 body 元素）的水平偏移量（px）
`element.offsetTop` 表示元素*左上角*想对于其最近已经定位（position: realative | absolut | fixed）的上级元素（直到 body 元素）的垂直偏移量（px）

左上角：border 的左顶点，和 box-sizing 没有关系
水平偏移量：border 外部 到 border 内部 的距离（这里就要注意，如果是叠加获取距离最上边或者最左边的距离的时候，要额外的加上 border 的宽度）

> 只读
> 如果要相对于整个文档,可能要递归的叠加直到 body 元素
> 这个计算不包括 transform 带来的视觉唯一

## offsetWidth 和 offsetHeight

`element.offsetWidth` 返回元素的布局宽度，包括 padding、border、滚动条的宽度，但是不包括 margin
`element.offsetHeight` 返回元素的布局高度，包括 pdding、border、滚动条的宽度，但是不包括 margin

和 box-sizing 没有关系

> 只读
> 四舍五入为整数

### 滚动条

滚动条的位置是 padding-box 内，并且贴着 border-box，但是滚动条的宽度是占据 padding-box 内的 content-box 的宽度的，在浏览器的元素探查中看到的 content-box 的宽度是包含了滚动条的宽度的（即使是 box-sizing:content-box;width:100px 这个 100px 也包含了 滚动条的宽度）；也就是说，如果出现了纵向滚动条，具体显示内容的宽度其实是要比元素探查中的宽度要小

为什么滚动条出现在 padding-box 里面，却将滚动条的宽度计算到 padding-box 内的 content-box 上？？？
当 content-box 的宽度是固定的，如果内容出现滚动条，这个时候，如果将滚动条的宽度压缩 padding-box 的宽度，而 padding-box 相比于 content-box 更可能本身的宽度小于滚动条的宽度，这个时候，很可能会出现页面突然变宽了，整体的布局会发生抖动

## getBoundingClientRect()

返回一个 DOMRect 对象，包含元素的大小以及相对于*浏览器视口*（非整个文档）的位置信息

- left 元素左边缘相对于视口左边缘的距离
- top 元素上边缘相对缘视口上边缘的距离
- right 元素右边缘相对于视口*左边缘*的距离
- bottom 元素下边缘相对于视口*上边缘*的距离
- width 元素的宽度（等同于 offsetWidth，但在某些情况下，例如当元素有 transform: scale() 时，getBoundingClientRect().width 会反映缩放后的大小，而 offsetWidth 可能不会）
- height 元素的高度
- x 元素的左上角相对于视口的水平坐标（等同于 left）
- y 元素的左上角相对于视口的垂直坐标（等同于 top）

## element.style

element.style.top
element.style.left
只有当前元素是的 position 为 absolut relative fixed 时，这些值才有效
获取到的是内联样式（带单位），如果不是内联设置的，获取到的就是空字符串

## window.getCompuntedStyle()

返回一个 CSSStyleDeclaration 对象，其中的数据是当前元素所有活动样式表并解析所有 CSS 规则后最总计算得到的样式

注意获取其内容要使用 getPropertyValue() 来获取，会返回单位
