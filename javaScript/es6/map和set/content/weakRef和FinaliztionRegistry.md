# WeakRef
用于直接创建对象的弱引用

### WeakRef的构造函数
WeakRef的构造函数，接受一个对象（非null）和Symbol，生成一个WeakRef的实例，对该实例的操作不影响垃圾回收机制回收原对象

WeakRef实例有一个方法deref()；如果原始对象还存在，没有被垃圾回收机制回收，则返回原值，如果被回收了，返回undefined

# FinalizationRegistry
指定目标对象被垃圾回收机制清楚后要执行的回调
1. 生成注册表实例 const registry1 = new FinaliztionRegistry(heldValue => {}); 里面的回调垃圾回收之后要执行的代码
2. 绑定要观察的对象 registry1.registry(object, "some value"); "some value"会作为参数，传递给前面的回调的heldValue；这里对object的引用也是弱引用
3. 若想要回调，registry1.registry要传第三个参数，可以是当前要观察的对象，取消观察registry1.unregistry(之前的第三个参数)