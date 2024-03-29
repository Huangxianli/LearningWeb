/* 
要使用TypeScript 要先安装typeScript编译器
npm install -g typesppcript 
 */

/*
安装好typeScript编译器之后，就可以使用 tsc 文件名.ts 来编译代码 生成js代码文件
 */

/*
ts编译成为js后，默认是放在同一个文件夹下的，编译后的js里面的变量有些会和ts的变量是一样的，这样就会有检查冲突
tsc --init 生成配置文件后就可以解决
会生成tsconfig.json文件
*/

/*
自动编译，不用每次修改一点ts文件就要手动的执行tsc
tsc --watch （在要自动编译的目录下面）
 */

/*
编译某个ts文件如果控制台会报错的话，就不将这个ts文件编译成js文件
tsc --noEmitOnError 
 */

/*
tsconfig.json文件解析
strict: true， 是否使用严格模式， 
target: "es5", 将ts文件编译成es5的语法的js文件
 */

/*
rootDir: "./src" 要转化的ts文件的文件夹
outDir: "./dist" 存放转化之后js文件的文件夹
 */