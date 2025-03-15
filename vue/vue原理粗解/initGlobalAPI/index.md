# initGlobalAPI 的操作
## 给 Vue 添加 config 对象
Object.defineProperty(Vue, 'config', config)

## 添加一些自己内部用的方法
Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive
};

## 给 Vue 添加 set 方法
## 给 Vue 添加 delet 方法
## 给 Vue 添加 nextTick 方法

## 给 Vue 添加 observable 方法
Vue.observable = (obj) => { ...}

## 给 Vue 添加 options 空对象
Vue.options = Object.create(null);

## 给 Vue.options 对象 添加 components directives filters 空对象
[].forEach(type => {
 Vue.options[type] = Object.create(null);
})

## Vue.options._base = Vue

## extend(Vue.options.components, builtInComponents)

## initUse(Vue)
给 Vue 添加 use 方法

## initMixin(Vue)
给 Vue 添加 mixin 方法

## initExtend(Vue)
给 Vue 添加 extend 方法

## initAssetRegisters(Vue)
给 Vue 添加 
component directive filter 方法