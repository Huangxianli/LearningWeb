# package.json
用于记录项目信息（也包括依赖库的信息）

## 生成 package.json 文件
+ npm init -y
+ 通过脚手架

## package.json 的字段信息
+ name 包名
+ version 版本
+ description 项目描述
+ author 作者信息
+ license 开源协议
+ private 是否私有项目，设置为 true 的时候，该项目不能发布
+ main 包的入口，要使用该包的时候，从那个文件开始读取 不设置的话，默认是 "index.js"
+ scripts 配置脚本运行代码 执行 npm run key 对于特定的 key 可以省略 run (start test stop restart)
+ dependencies 生产环境和开发环境都依赖的包（这些包的代码需要在生产环境中出现）
+ devDependencies 开发环境的依赖的但是生产环境不依赖的包
+ peerDependencies 如果要项目 B 中使用这个项目打成的包 A，那么一定要在项目 B中已经下载了这个字段中配置的包和版本，也就是这个字段里面的包不会被打包到生产环境，在使用这个包 A 的时候，一定要下载了这个字段里面配置的包和版本
+ engines 指定 node 和 npm 的版本号
+ browserslist: 配置打包后的 js 的浏览器兼容请款

npm 的包通常要遵循 semver 版本规范
X.Y.Z
主版本.次版本.修订版本
不兼容修改.兼容的新增.兼容的问题修证

^1.2.2 主版本不变，次版本和修订版本每次下载都是最新的
~1.2.2 主版本和次版本不变，修订版本是最新的


