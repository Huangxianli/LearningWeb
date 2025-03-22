# Vue2.7 源码解析

core 核心
instance 实例
## src/platforms/web/entry-runtime-with-compiler

## src/platforms/web/runtime-with-compiler
重写 Vue.prototype.$mount 方法

## src/platforms/web/runtime/index
给 Vue.config 添加一些方法
mustUseProp
isReservedTag
isReservedAttr
getTagNamespace
isUnknownElement

给 Vue.options.directives components 添加一些自己定义的 model show Transition TransitionGroup 

给 Vue.prototype 添加 __patch__ 方法 
给 Vue.prototype 添加 $mount 方法

## sinrc/core/index
对 Vue 进行一些操作
### initGlobalAPI(Vue)
给Vue添加一些属性和方法
[initGlobalAPI做的事情]
### 给 Vue 实例的原型添加 $isServer
Object.definProperty(Vue, '$isServer', )

### 给 Vue 实例的原型添加 $ssrContext
Object.definePropery()
### 给 Vue 本身添加 FunctionalRenderContext
Object.definProperty()

## src/core/instance/index
定义 Vue，对 Vue 的实例对象（的原型）进行一些操作
Vue 函数里面执行 this._init(options)

### initMixin(Vue)
在 Vue.prototype 上定义 _init 方法
Vue.prototype._init = function ...
[initMixin中的操作](./initMinxin/index.md)

### stateMixin(Vue)
在实例原型上用 Object.definProperty(Vue.property, ) 添加  $data 和 $props 对象
在实例原型上添加 $set $delete $watch 方法 Vue.prototype.$set = 
[stateMixin中的操作](./stateMixin/index.md)

### eventMixin(Vue)
[eventMixin中的操作](./eventMixin/index.md)
在实例的原型上添加 $on  $once $off $emit 方法
Vue.prototype.$on = function () {...}

### lifecycleMixin(Vue)
[lifecycleMixin中的操作](./lifecycleMixin/index.md)
在实例原型上绑定 _update、$forceUpdate、$destroy 方法

### renderMixin(Vue)
[renderMixin中的操作](./说明.md)
installRenderHelpers(Vue.prototype)
在实例的原型上添加 $nextTick、_render 方法