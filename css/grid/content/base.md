# grid布局
网格是一组相交的 *水平线* 和 *垂直线*
grid布局是基于网格的布局，带有行和列

和flex布局相比：
1. flex布局是轴线布局，项目只能针对轴线的位置，可以看做一维布局
2. grid布局是将容器划分为行和列，产生单元格，指定项目所在的单元格，可以看做二维布局

## 网格容器
使用 display: grid / inline-grid 会让元素变成 *网格容器*，所有的直系子元素变成 *网格元素*

### 网格轨道
+ grid-template-columns 定义网格中的列的*宽度*
  > grid-template-columns: 100px 100px 100px;s
+ grid-template-rows 定义网格中的行的*高度*
  > grid-template-rows: 100px 100px 100px;s

#### repeat()
两个参数
> grid-template-colums: repeat(2, 100px 20px);
1. 重复的次数
  auto-fill 关键字，表示自动填充，使得一行或一列容纳*尽可能多*的单元格
2. 重复的内容
   
#### fr单位
（表示比例关系），1fr单位代表网格容器中可用空间的一等份

#### minmax()函数
表示长度在两个值之间

#### auto
表示由浏览器自己决定长度

### 网格间距
包括了两端的间距
+ grid-column-gap
+ grid-row-gap
+ grid-gap

### 网格线
网格线的编号顺序取决于文章的书写模式，网格线的编号从1开始
+ grid-column-start: 网格线编号
+ grid-column-end: 网格线编号
+ grid-row-start: 网格线编号
+ grid-row-end: 网格线编号

#### 网格线的名称
grid-template-columns: [c1 cc1] 100px [c2] 100px [c3]

### 区域
网格布局允许指定区域，一个区域有一个或多个单元格组成
grid-template-areas： 'a . c' ' d e f' 'h i j'
3 * 3 的grid布局， 点表示不需要利用的区域


## 网格项目

