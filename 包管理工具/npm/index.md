# npm 
包管理工具
Node Package Manager （Node 包管理器）

[官网](https://www.npmjs.org/)
上传和下载 npm 包的目标地址都是 registry

npm install XXX，在当前文件夹下创建 node_modules 文件夹，用来存放下载的 XXX；同时会生成自己项目的 package.json，将当前的 XXX 写入到里面的 dependencies 或者 devDependencies 里面（根据 npm install 时的参数）
在项目中使用的时候 import ... from XXX / required(XXX) 会去 node_modules 中查找 XXX，具体引入，会看 XXX 包里面的 package.json 中的 main，没有的话，就引入 XXX 包的首层的 index.js 文件

npm install XXX / npm install XXX --save 会将 XXX 放在开发依赖和生产依赖中
npm install XXX --save-dev / npm install XXX -D 会将 XXX 放在开发依赖中

npm install XXX 局部安装，安装到当前目录的 node_modules 内
npm install XXX -g 全局安装，一般是安装工具包，具体的位置可以使用 npm root -g 来查看，和 node 的位置有关系

## npm install 的过程和原理
1. 查看是否有 package-lock.json 文件，
   + 没有，构建依赖关系，去 registry 仓库下载压缩包，解压放到 node_modules 里面
   + 有，检查依赖是否一致
      + 一致，查找缓存，有缓存的包，使用缓存的，没有缓存的包，去仓库下载
      + 不一致，重新构建依赖关系，再去仓库下载


卸载某个包
npm uninstall XXX
npm uninstall xxx -D

强制重新 build 
npm rebuild

清除 npm 缓存
npm cache clean