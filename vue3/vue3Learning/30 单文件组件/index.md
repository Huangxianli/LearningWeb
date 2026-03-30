# 单文件组件

SFC Single-File Component

- `<template>`

  > 一个 .vue 文件最多可以包含一个顶层的 `<template>` 块
  > 会将包裹的内容 提取、传递 给 @vue/compiler-dom，预编译为 JS 渲染函数，并在导出的组件上作为其 render 选项

- `<script>`

  > 一个 .vue 文件最多可以包含一个 `<script>` 块。（使用 `<script setup>` 的情况除外）
  > 这个脚本代码将作为 ES 模块执行
  > 默认导出的应该是 Vue 的组件选项对象，可以是一个字面量对象或者是 defineComponent 函数的返回值

- `<script setup>`

  > 一个 .vue 文件最多可以包含一个 `<script setup>`。（不包括一般的 `<script>`）
  > 这个脚本块将被预处理为组件的 setup() 函数，这意味着它将为每一个组件实例都执行。`<script setup>` 中的顶层绑定都将自动暴露给模板

- `<style>`

  > 每个 \*.vue 文件可以包含多个 `<style>` 标签
  > 一个 `<style>` 标签可以使用 scoped 或 module attribute (查看<a href="https://cn.vuejs.org/api/sfc-css-features">单文件组件样式功能</a>了解更多细节) 来帮助封装当前组件的样式。使用了不同封装模式的多个 `<style>` 标签可以被混合入同一个组件

- 自定义块

  > 在一个 \*.vue 文件中可以为任何项目特定需求使用额外的自定义块。举例来说，一个用作写文档的 `<docs>` 块
  > 自定义块的处理需要依赖工具链。请参见<a href="https://cn.vuejs.org/guide/scaling-up/tooling.html#sfc-custom-block-integrations">单文件组件自定义块集成工具链指南</a>获取更多细节

- 自动名称推导

  > 单文件组件在以下场景中会根据文件名自动推导其组件名
  > 开发警告信息中需要格式化组件名时；
  > DevTools 中观察组件时；
  > 递归组件自引用时。例如一个名为 FooBar.vue 的组件可以在模板中通过 `<FooBar/>` 引用自己。(同名情况下) 这比明确注册/导入的组件优先级低。

- 预处理器

  > 代码块可以使用 lang 这个 attribute 来声明预处理器语言，例如 `<script lang="ts">`、`<style lang="less">` 和 `<template lang="pug">`

- src 导入

  ```html
  <template src="./template.html"></template>
  <style src="./style.css"></style>
  <script src="./script.js"></script>
  ```

  > 自定义模块也适用

- 注释
  > 在每一个语块中你都可以按照相应语言 (HTML、CSS、JavaScript 和 Pug 等等) 的语法书写注释。对于顶层注释，请使用 HTML 的注释语法 `<!-- comment contents here -->`

## 为什么使用单文件组件

使用单文件组件就意味着必须使用构建工具，但是有以下优点

- 模块化
- 强相关的内容应该就是内聚的
- 预编译模板，避免运行时编译开销
- 组件作用于的 CSS
- 在使用组合式的 API 时语法更简单
- 更好的编译时优化
- 更好的 IDE 支持
- 开箱即用的热更新功能

## 单文件组件是如何工作的

> .vue 文件要由 @vue/compiler-sfc 编译为标准的 JS 和 CSS，一个 .vue 文件编译后是一个标准的 JS（ES） 模块，如果配置正确，可以像导入其他的 ES 模块一样导入单文件组件
> 对于 `<style>` 会在开发时生成 `<style>` 标签以支持热更新，生产环境会生成单独的 CSS 文件

# \<script setup>

## 基本语法

```vue
<script setup>
import { ref } from 'vue';

import { importData } from '';
// 里面的代码会被编译成组件 setup() 函数的内容。
// <script setup> 中的代码会在每次组件实例被创建的时候执行
const data = 'data'; // 任何在 <script setup> 内顶部声明的变量、函数、import 的内容都可以在模板中直接使用

const refData = ref('refData'); // ref 变量在 template 中使用会自动的解包
</script>
<template>
  <div>{{ importData }}</div>
  <div>{{ data }}</div>
  <div>{{ refData }}</div>
</template>
```

## 使用组件

```vue
<!-- TreeNode.vue -->
<script setup>
import MyComponent from './MyComponent.vue'; // <script setup> 内的值也能被直接作为自定义组件的标签使用，也就是说只要符合要求，即使是在这定义一个对象，也可以作为一个组件在 template 中使用
const { node } = defineProps({
  node: {
    type: Object,
    default: () => ({
      children: [],
      name: '',
      key: '',
    }),
  },
});
</script>
<template>
  <component :is="MyComponent"></component>
  <!-- 动态组件 -->
  <template v-if="node.children && node.children.length">
    <!-- 可以递归的使用自己，但是一定要有中断条件，不然会陷入死循环 -->
    <TreeNode v-for="item in node.children" :key="item.key" :node="item" />
  </template>
</template>
```

## 使用自定义指令

```vue
<script setup>
const vMyDirective = {
  // 本地的自定义指令在 <script setup> 中不需要显式注册，但是要 vXxx 的方式命名
  beforeMount: (el) => {
    // 在元素上做些操作
  },
};
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

## defineProps() 和 defineEmits()

- defineProps 和 defineEmits 都是只能在 \<script setup> 中使用的编译器宏。他们不需要导入，且会随着 \<script setup> 的处理过程一同被编译掉
- defineProps 接收与 props 选项相同的值，defineEmits 接收与 emits 选项相同的值
- defineProps 和 defineEmits 在选项传入后，会提供恰当的类型推导
- 传入到 defineProps 和 defineEmits 的选项会从 setup 中提升到模块的作用域。因此，**传入的选项不能引用在 setup 作用域中声明的局部变量。这样做会引起编译错误。但是，它可以引用导入的绑定，因为它们也在模块作用域内**

* defineProps 或 defineEmits 要么使用运行时声明，要么使用类型声明。同时使用两种声明方式会导致编译报错

```vue
<script setup>
import { toRefs } from 'vue';
const { foo } = defineProps(['foo']); // 3.5 这么解构出来的还是一个响应式数据，是因为编译的时候会被编译成类似 props.foo，但是要注意，如果传递给 watch 的第一个参数、作为 hook 的参数都要注意转化成 getter 的方式，以维持其响应式
const { foo = 12 } = defineProps(['foo']); // 3.5 可以使用这种方式设置解构的默认值

const { foo } = toRefs(defineProps(['foo']));
const foo = toRef(defineProps(['foo']), 'foo');
// 这两种方式都可以让 foo 保持响应式，但是要注意的是这样的 foo 是一个 Ref 对象

const { foo } = toRefs(
  withDefaults(defineProps(['foo', 'msgObj']), {
    foo: 12,
    msgObj: () => ({ msg: '' }), // 如果默认值是引用类型，要使用工厂函数的形式
  }),
);
</script>
```

## defineModel()

```vue
<script setup>
const model1 = defineModel({ type: String, default: '1' }); // 注意，默认值不会同步到父组件中 prop 为 modelValue，emit 为 update:modelValue

const model2 = defineModel('count', { type: Number, default: 1 }); // prop 为 count，emit 为 update:count

const [model3, modelModifiers] = defineModel('clicks', {
  set(value) {
    if (modelModifiers.xxx) {
      // 在组件上绑定 v-model:count.xxx = "";
      return xxx;
    }
    return value;
  },
});
</script>
```

## defineExpose()

\<script setup> 中的内容是默认关闭的，通过 $parent 获取不到里面的内容，可以通过 defineExpose() 来暴露内容

## defineOptions();

例如 inheritAttrs 放在这里面设置，就不需要单独的使用 \<script> 来设置

## defineSlots()

只接受类型参数，没有运行时参数

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any;
}>();
</script>
```

## useSlots() 和 useAttrs()

一般可以通过 $slots 和 $attrs 获取

## 与普通的 \<script> 一起使用

不要为已经可以用 \<script setup> 定义的选项使用单独的 \<script> 部分，如 props 和 emits
在 \<script setup> 中创建的变量不会作为属性添加到组件实例中，这使得它们无法从选项式 API 中访问。我们强烈反对以这种方式混合 API
如果你发现自己处于以上任一不被支持的场景中，那么你应该考虑切换到一个显式的 setup() 函数，而不是使用 \<script setup>

## 顶层 await

\<script setup> 中可以使用顶层 await。结果代码会被编译成 async setup()
async setup() 必须与 Suspense 组合使用

## 泛型

可以使用 \<script> 标签上的 generic 属性声明泛型类型参数 \<script generic="T">

# 单文件组件 CSS 功能

## 组件作用域 CSS

```vue
<style scoped>
/*
处于 scoped 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 :deep() 这个伪类：
*/
.a :depp(.b) {
}
/*
作用域样式不会影响到 <slot /> 渲染出来的内容，可以使用 :slotted 伪类来明确
 */
:slotted(div) {
}

/* 
全局
 */
:global(.red) {
}
</style>
```

## CSS Modules

一个 \<style module> 标签会被编译为 CSS Modules 并且将生成的 CSS class 作为 $style 对象暴露给组件

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

具名

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

和组合式 API 一起使用
可以使用 useCssModule API

```vue
<script setup>
import { useCssModule } from 'vue';

// 在 setup() 作用域中...
// 默认情况下，返回 <style module> 的 class
// useCssModule();

// 具名情况下，返回 <style module="classes"> 的 class
useCssModule('classes');
</script>
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

## CSS 中的 v-bind()

```vue
<script setup>
import { ref } from 'vue';
const theme = ref({
  color: 'red',
});
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color'); // 注意这里有引号
}
</style>
```
