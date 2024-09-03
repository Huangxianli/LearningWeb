# Map
> Map结构实质上是集合<key,value>（Hash结构），和普通的对象相比，Map的key值可以是任何类型，不会被转化成字符串

### Map构造函数
构造函数结构的参数要求：实现了Iterable接口，每个成员都是一个双元素的数组
如果成员的key值相同，会被后出现的覆盖掉（可以针对key进行去重，和set一样，使用 same-value-zero equality来比较是否相等，NaN与NaN相等，-0和+0相等）

### Map的实例属性和方法
size
set（增，改）（返回map本身）（这个方法和set中的get是不同的，能够修改已有的值，Set数据结构没有改的功能）
get（查）
has（查）
delete（删）
clear（删）

### Map的遍历操作
keys（返回遍历器对象）
values（返回遍历器对象）
entries（返回遍历器对象）（Map.prototype.entries === Map.prototype[Symbol.iterator]）
forEach

# WeakMap
WeakMap和Map的区别
1. 键只接受对象（非null）和Symbol
2. 键指向的对象不计入垃圾回机制中，注意只是键指向的对象，值指向的对象是会计入垃圾回收机制中的

### WeakMap的方法
set
get
has
delete

