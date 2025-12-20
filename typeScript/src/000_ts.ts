/* 
要使用TypeScript 要先安装 typeScript 编译器
npm install -g typespcript 
 */

/*
安装好 typeScript 编译器之后，就可以使用 tsc [文件名.ts] 来编译文件 生成 js 代码文件
 */

/*
ts 编译成为 js 后，默认是放在同一个文件夹下的，编译后的 js 里面的变量有些会和 ts 的变量是一样的，这样就会有检查冲突
tsc --init 生成配置文件后就可以解决
会生成 tsconfig.json 文件
*/

/*
自动编译，不用每次修改一点 ts 文件就要手动的执行 tsc
tsc --watch （在要自动编译的目录下面）
 */

/*
编译某个 ts 文件时如果控制台会报错的话，就不将这个 ts 文件编译成 js 文件
tsc --noEmitOnError 
 */

/*
tsconfig.json 文件解析
strict: true， 是否使用严格模式， 
target: "es5", 将 ts 文件编译成 es5 的语法的 js 文件
 */

/*
rootDir: "./src" 要转化的 ts 文件的文件夹
outDir: "./dist" 存放转化之后 js 文件的文件夹
 */
