# flex布局
> Flexible Box（弹性布局）
> 可以简单、完整、*响应式*的实现各种页面布局
> *任何一个容器*都可以指定为flex布局
> WebKit内核的浏览器要加上-webkit前缀
  >> display: -webkit-flex
  >> display: flex / inline-flex

flex容器中的项目都会有以下默认行为
+ 排列为一行
+ 从主轴的起始线开始
+ 项目不会在主轴方向上拉伸，但是可以缩小
+ 元素被拉伸用来填充交叉轴的大小
+ flex-basis属性为auto
+ flex-wrap属性为nowrap

## 基本概念
felx布局设置的是容器元素*内部的子元素*的布局方式，容器元素简称容器，内部的子元素称为flex项目，简称项目
![flex布局基本概念](3791e575c48b3698be6a94ae1dbff79d.png)

容器
+ 主轴（默认水平方向）
+ 交叉轴（默认垂直方向）

## 容器的属性
+ ![flex-direction](#flex-direction)
+ ![flex-wrap](#flex-wrap)
+ ![flex-flow](#flex-flow)
+ ![justify-content](#justify-content)
+ ![align-items](#align-items)
+ ![align-content](#align-content)

### flex-direction
flex-direction 决定主轴的方向（也决定了第一个项目开始的地方）（受direction属性影响）
*注意： 总是从靠近主轴开始到主轴结束的方向依次按顺序排列第一个到最后一个项目，通过flex-direction改变了主轴的走向，会使第一个项目可以出现在最后侧或者最下方*
+ row 
+ row-reverse 主轴在水平方向，起点在右边，第一个项目在最右边（在direction为：ltr的情况下）
+ column
+ colum-reverse 主轴在垂直方向，起点在下方

### flex-wrap
控制项目在一条周线上如果排不开，是否换行
+ nowrap
+ wrap
+ wrap-reverse 换行 （会使元素在交叉轴上，从交叉轴结束的地方开始排列）

### flex-flow
flex-direction flex-wrap的简写 默认值为row nowrap

### justify-content
项目在主轴上的对齐方式（主轴做垂线）
+ flex-start
+ flex-end
+ center（项目间不留空隙）
+ space-between 两端对齐，项目中间的间隔都相等（两端没有间隙）
+ space-around 每个项目的间隔相等，两端的间距是连续两个主轴的间距的一半
+ left
+ right
+ start （当主轴是水平方向的时候，在主轴上受direction属性影响，不受flex-direction影响；当主轴在垂直方向上，表现和flex-start一样）
+ end （当主轴是水平方向的时候，在主轴上受direction属性影响，不受flex-direction影响；当主轴在垂直方向上，表现和flex-end一样）
+ space-evenly 所有空间平均分割，哪怕两端也是一样的间隔

在主轴方向上，当margin设置为auto的时候，会自动占据剩余的空间

### align-items
定义一条主轴上所有项目在交叉轴上的对齐方式（交叉轴做垂线）
注意：flex-start/flex-end 受 *direction*和*flex-direction* 影响
+ flex-start
+ flex-end
+ center
+ baseline 沿着项目的基线对齐
+ stretch 默认值 如果没有设置高度或者auto，则占满容器的交叉轴方向上的空间
+ start （不关注交叉轴的flex-start和flex-end方向，flex-wrap: wrap-reverse可以改变交叉轴的flex-start和flex-end方向）
+ end（不关注交叉轴的flex-start和flex-end方向）

### align-content
将一条主轴上的项目作为整体的一大项，设置多个大项在交叉轴的对齐方式
注意：flex-start/flex-end 受 *direction*和*flex-direction* 影响
+ flex—start
+ flex-end
+ felx-center
+ stretch
+ space-between
+ space-around
+ start
+ end

## 项目的属性
+ ![order](#order)
+ ![flex-grow](#flex-grow)
+ ![flex-shrink](#flex-shrink)
+ ![flex-basis](#flex-basis)
+ ![flex](#flex)
+ ![align-self](#align-self)

### order
定义项目的排列顺序，越小，在一行中越接近主轴的 开始方向

### flex-grow
定义属性的放大比例（在主轴方向上的），如果所有的项目都设置了相同的值，剩余空间平均分配给每个项目，和项目在主轴上的宽度没有任何关系（flex-basis: 0 除外）

### flex-shrink
定义属性的缩小比例
如果flex-basis设置为了0，则该项目不会在空间分配计算的考虑之内

### flex-basis
定义了在分配多余的空间的时候，项目占据主轴的空间
指定flex项目在主轴方向上的初始大小，如果box-sizing不改变，则决定了content-box的尺寸，不包括padding border margin
flex-basis的优先级比width和height的优先级要高

### flex
flex-growp flex-shrink flex-basis 的简写
后两个属性可选
默认值 0 1 auto
flex: auto （1 1 auto）
flex: none （0 0 auto）
flex: 2 （2 1 0）

### align-self
允许单个项目有与其他项目不同的在交叉轴的对齐方式。可覆盖align-items属性，默认auto继承align-items
+ auto
+ flex-start
+ flex-end
+ center
+ basline
+ stretch