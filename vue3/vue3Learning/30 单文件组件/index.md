# 单文件组件
SFC Single-File Component
+ `<template>`
  > 一个 .vue 文件最多可以包含一个顶层的 `<template>` 块
  > 会将包裹的内容 提取、传递 给 @vue/compiler-dom,预编译为 JS 渲染函数，并在导出的组件上作为其 render 选项

+ `<script>`
  > 一个 .vue 文件最多可以包含一个 `<script>` 块。（使用 `<script setup>` 的情况除外）
  > 这个脚本代码将最为 ES 模块执行
  > 默认导出的应该是 Vue 的组件选项对象，可以是一个字面量对象或者是 defineComponent 函数的返回值

+ `<script setup>`
  > 一个 .vue 文件最多可以包含一个 `<script setup>`。（不包括一般的 `<script>`）
  > 这个脚本块将被预处理为组件的 setup() 函数，这意味着它将为每一个组件实例都执行。`<script setup>` 中的顶层绑定都将自动暴露给模板

+ `<style>`
  > 每个 *.vue 文件可以包含多个 `<style>` 标签
  > 一个 `<style>` 标签可以使用 scoped 或 module attribute (查看单文件组件样式功能了解更多细节) 来帮助封装当前组件的样式。使用了不同封装模式的多个 `<style>` 标签可以被混合入同一个组件

+ 自定义块
  > 在一个 *.vue 文件中可以为任何项目特定需求使用额外的自定义块。举例来说，一个用作写文档的 `<docs>` 块
  > 自定义块的处理需要依赖工具链

+ 自动名称推导
  > 单文件组件在以下场景中会根据文件名自动推导其组件名
  > 开发警告信息中需要格式化组件名时；
  > DevTools 中观察组件时；
  > 递归组件自引用时。例如一个名为 FooBar.vue 的组件可以在模板中通过 `<FooBar/>` 引用自己。(同名情况下) 这比明确注册/导入的组件优先级低。

+ 预处理器
  > 代码块可以使用 lang 这个 attribute 来声明预处理器语言，例如 `<script lang="ts">`、`<style lang="less">` 和 `<template lang="pug">`

+ src 导入
  ```html
  <template src="./template.html"></template>
  <style src="./style.css"></style>
  <script src="./script.js"></script>
  ```
  > 自定义愉快也适用

+ 注释
  > 在每一个语块中你都可以按照相应语言 (HTML、CSS、JavaScript 和 Pug 等等) 的语法书写注释。对于顶层注释，请使用 HTML 的注释语法 `<!-- comment contents here -->`


## 为什么使用单文件组件
单用单文件组件就意味着必须使用构建工具，但是有以下优点
+ 模块化
+ 强相关的内容应该就是内聚的
+ 预编译模板，避免运行时编译开销
+ 组件作用于的 CSS
+ 在使用组合式的 API 时语法更简单
+ 更好的编译时优化
+ 更好的 IDE 支持
+ 开箱即用的热更新功能

## 单文件组件是如何工作的
> .vue 文件要由 @vue/compiler-sfc 编译为标准的 JS 和 CSS，一个 .vue 文件编译后是一个标准的 JS（ES） 模块，如果配置正确，可以像导入其他的 ES 模块一样导入单文件组件
> 对于 `<style>` 会在开发时生成 `<style>` 标签以支持热更新，生产环境会生成单独的 CSS 文件

## 如何看待关注点分离
