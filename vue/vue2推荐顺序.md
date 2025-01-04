# 组件/实例的选项顺序

## 副作用（触发组价外的影响）
+ el

## 全局感知（要求组件以外的知识）
+ name
+ parent

## 组件类型（更改组件的类型）
+ functional

## 模板修改器（改变模板的编译方式）
+ delimiters
+ comments

## 模板依赖（模板内使用的资源）
+ components
+ directives
+ filters

## 组合（想选项内合并 property）
+ extends
+ mixins

## 接口（组件接口）
+ inheritAttrs
+ model
+ props / propsData

## 本地状态（本地响应式 property）
+ data
+ computed

## 事件（通过响应式事件触发的回调）
+ watch
+ 生命周期钩子
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - activated
  - deactivated
  - beforeDestroy
  - destroyed

## 非响应式的property（不依赖响应系统的实例 property）
+ methods

## 渲染（组件输出的声名式描述）
+ template / render
+ renderError

# 元素 attribute 的顺序

## 定义（提供组件的选项）
+ is

## 列表渲染（创建多个变化的相同元素）
+ v-for

## 条件渲染（元素是否渲染/显示）
+ v-if
+ v-else-if
+ v-else
+ v-show
+ v-cloak

## 渲染方式（改变元素的渲染方式）
+ v-pre
+ v-once

## 全局感知（需要超越组件的知识）
+ id

## 唯一的 attribute（需要唯一值的 attribute）
+ ref
+ key

## 双向绑定（把绑定和事件结合起来）
+ v-model

## 其他 attribute（所有普通的 attribute）

## 事件（组件事件监听）
+ v-on

## 内容（覆写元素的内容）
+ v-html
+ v-text