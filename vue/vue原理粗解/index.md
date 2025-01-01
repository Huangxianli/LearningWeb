## initMixin(Vue)
Vue.prototype._init
### _init()
initLifecycle()
initEvent()
initRender()
callHook() -- beforeCreate
initInjections()
initState()
initProvide()
callHook() -- created
如果有 el 属性就执行 $mount( .el)

## stateMixin(Vue)
Object.defineprototype(Vue.prototype,'$data', )
Object.defineprototype(Vue.prototype,'$props', )
Vue.prototype.$set
Vue.prototype.$delete
Vue.prototype.$watch

## eventMixin(Vue)
Vue.prototype.$on
Vue.prototype.$once
Vue.prototype.$off
Vue.prototype.$emit


## lifecycleMixin(Vue)
Vue.prototype._update
Vue.prototype.$forceUpdate
Vue.prototype.$destory

## renderMixin(Vue)
installRenderHelpers(Vue.prototype) --向 Vue.prototype 上添加很多的方法
Vue.prototype.$nextTick
Vue.prototype._render


## initGlobalAPI(Vue)
Object.defineProperty(Vue, 'config', )
Vue.util
Vue.set
Vue.delete
Vue.nextTick
Vue.observable
Vue.options -> {components': {}, 'directives': {}, 'filters: {}}

// Vue.options._base = Vue

### extend(Vue.options.components, KeepAlive)

### initUse(Vue)
Vue.use

### initMixin(Vue)
Vue.mixin

### initExtend(Vue)
Vue.extend

### initAssetRegisters(Vue)
Vue.component
Vue.directive
Vue.filter


## Vue.config.xxx
Vue.config.mustUseProp
Vue.config.isReservedTag
Vue.config.isReservedAttr
Vue.config.getTagNamespace
Vue.config.isUnknownElement

## extend(Vue.options.directive, ...) extend(Vue.options.components, ...)
给 Vue.options.directive 中添加 model 和 show 也就是添加自定义指令 v-model v-show
给 Vue.options.components 中添加 Transition 和 TransitionGroup （过渡的动画组件）

## Vue.prototype.__patch__
给 Vue.prototype 添加 __patch__ 方法，用来比较新旧的虚拟 dom，并把差异更新到真实 dom

## Vue.prototype.$mount
给 Vue.prototype 添加 $mount 方法

## Vue.prorotype.$mount
重写 $mount 方法

这个方法里面处理：
1. el 的边界处理，不能是 body 和 document.documentElement
2. 处理 $options 中的 render 不存在的情况，要根据 templat 和 el 生成一个 render 函数，并挂在自己的 $options 上（这里就说明 render 的优先级高于 template）
      1. 如果有 template 而且是 # 这种形式，将 template 转化成最终渲染的 dom；如果是 template 是一个 dom，则直接取它的 innnerHtml
      2. 如果没有 template 但是有 el，将 template 转化成 el 对应的 outHtml（这里说明 template 的优先级高于 el）
      3. 再看是否有 template，这个时候，如果是正确的写法，template 应该就是 dom 的形式了（有可能是通过 template 或者 el 转化的，也有可能之前传入的就是一个 dom），如果有 template 则将 template 生成 render 函数，挂在 this.$options.render 上
3. 将 自己作为 this， 使用 call 调用原来的 Vue.proptotype.$mount 方法


## Vue.compile = compileToFunctions
