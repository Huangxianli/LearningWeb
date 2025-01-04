# Set
> Set数据结构是集合对象，类似于数组，但是**成员的值都是唯一**的，没有重复的值。
> Set的key和value对应的一个值，可以是任何的数据类型，加入的时候不会和数组一样发生类型转换，且加入的顺序就是遍历时的顺序

### Set构造函数
````javascript
let a = [1];
new Set(a); // a只要是实现了iterable接口就可以作为参数传入Set构造函数
// Set{1+}
````
### Set内部的比较方式
Set内部的比较方式，使用的“same-value-zero equality”（同零值相等比较法）。+0和-0是相等的，NaN是等于NaN的。这种比较方式和严格相等（===）的区别在于对于NaN的比较；和Object.is()区别是对于+0和-0的比较 
> 这样就导致，使用Set对数组去重的时候，若存在NaN，最终结果只会有一个NaN，若涉及到NaN就要考虑是否应该使用Set进行去重 

### Set实例方法和属性
size
add（增），返回set实例本身，可以实现链式调用
delete（删）
clear（删）
has（查）
> 注意没有改方法

### 遍历操作
keys，返回遍历器对象（注意返回的不是数组）
values，返回遍历器对象
entries，返回遍历器对象
forEach
> keys和values的实现是一样的，同时也和iterable接口实现一样 set.keys === set.values, set.values === set[Symbol.iterator]


# WeakWet
> WeakSet和Set类似，都是不重复的合集

### Set和WeakSet的两个不同
1. WeakSet的成员只能是对象（非null对象）和Symbol
2. WeakSet中的对象是弱引用，垃圾回收机制不会考虑WeakSet对该对象的引用，如果add一个对象进去，且外部没有对该对象的引用了之后，垃圾回收时，就会将该WeakSet中删除该对象，以至于没有size、clear、keys、values、entries、forEach等有遍历操作的属性方法


