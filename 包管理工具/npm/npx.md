# npx
在控制台中，直接输入 webpack，会去查找全局安装的 webpack，要查找当前文件夹中下载的 webpack 的话就要使用 npx webpack
npx XXX 会优先查找当前目录下的 node_modules 下的 .bin 下 是否有 XXX 文件，有的话，就执行 XXX，如果没有的话，就去全局查找 XXX，如果都没有找到，会临时下载，执行完对应的指令之后会删除

如果是将 npx webpack 这种写法集成到 package.json 的 script 中，就可省略 npx，因为本身在这里面就会自动的去当前目录下 node_modules .bin 下去找 webpack 文件，如果没有找到，就会去全局中找，如果还没找到会报错

scripts: {
  dev: "webpack"
}
npm run dev ≈ npx webpack
不同之处在于，npm run dev 如果当前文件夹的 node_modules 里面和全局都没有找到的话，不会临时下载，会直接报错；npx 则不同，会临时下载使用，使用完了之后又会删除