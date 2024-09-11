# Symbol类型
>  Symbol类型出现的初衷是为了其唯一性，这个是Symbol类型最大的特性

### Symbol类型是原始类型
Symbol类型是**原始类型**，不是复杂类型
typeof Symbol() 返回的值是“symbol”而不是“object”
Symbol不能和new操作符一起使用，是为了避免创 建符号包装对象

### Symbol()函数
Symbol()函数接受一个参数，该参数会转化成字符串，用来描述新生成的Symbol实例
> 注意：Symbol类型的每个实例都是唯一的，即使创建实例的时候使用的描述符是一样的，但是生成的依旧是两个不同的实例

#### Symbol实例不能参与计算，但是可以显示的转化成字符串类型和布尔类型，但是不能转化成数值类型

### description属性
description属性用来获取描述Symbol实例的描述符，返回值可能为**string和undefined**两种类型。
无论是Symbol(description)还是Symbol.for(description)创建的Symbol实例，都可以用.description来获取
> 注意：description是会转化成字符串的，最终获取的时候，可能和设置的时候不同，最好是在创建实例的时候，只使用字符串；
> Symbol()如果在创建的时候没有传，返回的是undefined而不是“undefined”；但是Symbol.for()没有传的话，返回的就是“undefined”

### Symbol实例作为属性如何遍历
Symbol实例作为对象的属性的时候，可以通过Object.getOwnPropertySymbols()来收集，像Object.keys()、Object.getOwnPropertyNames()、for...in、JONS.stringify()（将对象转化成JSON字符串）都无法遍历出来。
> 一定要注意这里的JSON.stringify()，无论是作为key还是作为value都会丢失（key和value会同时丢失，这些方法中，只有这个方法在value为Symbol类型时，也会丢失：{a: Symbol()} => '{}'），常用来转化的

Object.getOwnPropertyNames()和Object.getOwnPropertySymbols()是互斥的，它们共同组合成了Reflect.ownKeys()

### Symbol.for() 和 Symbol.keyFor()
Symbol.for(description)方法创建的实例会注册到全局注册表中，注意相同的description使用Symbol.for创建时，只会创建一次，后面的是会直接返回前面已经创建的
> 注意，和Symbol()创建不同的是，Symbol.for()是会注册到全局注册表中的，相同的description指向的是同一个Symbol实例；而Symbol()创建的实例，不会注册到全局注册表中，即使description相同，指向的也是不同的Symbol实例；而且Symbol.for()如果没有传description的话，相当于Symbol.for('undefined')，而Symbol()创建是如果没有传，就是空的，不会转化成'undefined'，调用description的时候，返回的就是undefined  

Symbol.keyFor(a)用来获取Symbol实例a在全局注册表中的描述，也就是Symbol.for()时写入到全局注册表中的描述
> 注意，Symbol.keyFor()是去全局注册表中查找，如果在全局注册表中没有找到对应的实例，则返回undefined，也就是使用Symbol(description)创建的实例，用Symbol.keyFor()来查找的话，就是返回undefined；Symbol.for()不传参数创建实例的时候，就已经将“undefined”字符串用作了描述符，所以使用Symbol.keyFor()查找的时候，返回的是“undefined”字符串

### 内置的Symbol值
1. Symbol.hasInstance
  > 指向一个方法，使用 a instanceof A 的时候，其实就是调用了指向的这个方法A\[Symbol.hasInstance](a)
2. Symbol.toStringTag
  > 指向一个字符串，当对象调用toString()的时候，会调用这个替换掉“[object data]”里的data
3.  Symbol.toPrimitive
  > 指向一个方法，转化成原始类型的时候会调用这个方法，参数为hint(Number/String/Default)
4. Symbol.iterator
  > 指向一个方法，实现遍历器（iterator）接口，供for...of遍历使用
5. Symbol.asyncIterator
6. Symbol.isConcatSpreadable
7. Symbol.match
8. Symbol.reppace
9.  Symbol.search
10. Symbol.species
11. Symbol.unscopables



