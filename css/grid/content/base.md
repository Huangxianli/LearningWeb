# grid 布局

网格是一组相交的 _水平线_ 和 _垂直线_
grid 布局是基于网格的布局，带有行和列

和 flex 布局相比：

1. flex 布局是轴线布局，项目只能针对轴线的位置，可以看做一维布局
2. grid 布局是将容器划分为行和列，产生单元格，指定项目所在的单元格，可以看做二维布局

## 网格容器

使用 display: grid / inline-grid 会让元素变成 _网格容器_，所有的直系子元素变成 _网格元素_

### 网格轨道

- grid-template-columns 定义网格中的列的*宽度*
  > grid-template-columns: [line1] 100px [line2 line2_1] 100px [line3] 100px [line4]; _一条网格线可以有多个名称_
  > grid-template-columns: [-4] 100px [-3] 100px [-2] 100px [-1];
  > grid-template-columns: [1] 100px [2] 100px [3] 100px [4]; **如果没有手动的命名吗，这个是默认的**
- grid-template-rows 定义网格中的行的*高度*
  > grid-template-rows: 100px 100px 100px;

#### repeat()

两个参数

> grid-template-colums: repeat(2, 100px 20px);

1. 重复的次数
   auto-fill 关键字，表示自动填充，使得一行或一列容纳*尽可能多*的单元格
2. 重复的内容

#### fr 单位

（表示比例关系），1fr 单位代表网格容器中剩余空间的一等份，剩余空间是在任何非弹性项之后计算的

#### minmax()函数

表示长度在两个值之间

#### auto

表示由浏览器自己决定长度

### 网格间距

- grid-column-gap 设置项目行于行之间的间距
- grid-row-gap 设置项目列与列之间的间距
- grid-gap 行 列，如果省略了列的话，列会自动取行的值
  > 新版本中，去掉了 grid-

### 网格线

网格线的编号顺序取决于文章的书写模式，网格线的编号从 1 开始

- grid-column-start: 网格线编号
- grid-column-end: 网格线编号
- grid-row-start: 网格线编号
- grid-row-end: 网格线编号

#### 网格线的名称

grid-template-columns: [c1 cc1] 100px [c2] 100px [c3]

> 网格线如果没有自己定义的话，会从 1 开始自动的命名自增
> 一根网格线可以有多个名称

### 区域

网格布局允许指定区域（配合项目的 grid-area 使用），一个区域有一个或多个单元格组成

grid-template-areas： 'a . c' ' d d f' 'h i j'
3 \* 3 的 grid 布局， 点表示不需要利用的区域

项目 grid-area: d
这样的设置，当前项目就占据着 d 的位置

在不同的媒体查询下可以有不同的布局

### 布局顺序

grid-auto-flow
默认是 row，先行后列
column 先列后行
row dense 先行后列，并且尽量填满
column dense 先列后行，并且尽量填满

### 单元格内元素的水平和垂直位对齐方式

justify-items: start | end | center | stretch
align-items: start | end | center | stretch
place-items: <justify-items> <align-items>

### 一组元素为单位，多组元素在容器里面的布局方式

justify-content: start | end | center | stretch | space-around | space-between | space-evenly
align-content:
place-content:

### 多余的网格的列宽和列高设置

grid-auto-columns: 100px 50px
grid-auto-rows: 10px 200px

### 属性简写

grid-template: <grid-template-areas> <grid-template-rows> / <grid-template-columns>
grid-template: <grid-template-rows> / <grid-template-columns> 相当于将 grid-template-areas 设置成了 none

```css
.container {
  gird-template: [row1-start] 'header header header' 25px [row1-end]
    [row2-start] 'footer footer footer' 25px [row2-end] / auto 50px auto;
}

/* 等同于 */
.container {
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  gird-template-columns: auto 50px auto;
  grid-template-areas:
    'header header header'
    'footer footer footer';
}
```

grid: <grid-template-colunmns> <grid-template-rows> <grid-template-areas> <grid-auto-columns> <grid-auto-columns> <grid-auto-flow>

## 网格项目

### 当前项目开始和结束的位置

grid-column-start: [line-name] | span number
grid-column-end
grid-row-start
grid-row-end

grid-column: <start-line> / (<end-line> | span number)
grid-row: <start-line> / (<end-line> | span number)

### 指定项目放在那个区域

grid-area: areaname
grid-area: <row-start> / <column-start> / <row-end> / <column-end> （逆时针）

### 当前项目内的内容的对齐方式

justify-self: start | end | center | stretch
align-self:
place-self: <align-slef> <justify-slef>
