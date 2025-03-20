# 媒体查询
## 媒体设备类型
```html
<style media="screen"></style>
<style media="print"></style>
<style media="screen/print"></style>

<link ref="stylesheet" href="..." media="screen">
<link ref="stylesheet" href="..." media="print">
<link ref="stylesheet" href="..." media="all">

<style media="screen/print and (min-width: 100px)"></style>
<!-- 屏幕设备，而且宽度 》= 100px 的情况下 -->

```
```css
@import url(src/qweq) print;
@import url(src/qweq) screen;
@import url(src/qweq) all;

@media screen and (min-width: 300px) {
  /* min-width 大于等于 300px */
  /* max-width 小于等于 */
  body: {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) and (max-width: 900px) {
  /* 600 到 900 */
  body: {
    font-size: 16px;
  }
}

@media screen and (min-width: 900px), screen and (orientation: landscape) {
  /* 900 以上 或者 横屏 */
}

@media not screen and (min-width: 700px) and (max-width: 900px) {
  /* 小于 700 或者 大于 900 应用里面的样式表 */
}

@media only screen and (min-width: 700px) {
  /* 只有支持媒体查询的才会进入到这个里面 */
}
```
