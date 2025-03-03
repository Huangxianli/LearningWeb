## 使用 monorepo
pnpm  init 

想要将所有的依赖都拍平展示在 node_modules 里面
新建 .pnpmrc 文件
shamefully-hoist=ture


monorepo 指定在那个文件目录下去管理这些项目
新建 pnpm-workspace.yaml
```yaml
packages:
  - "packages/*"
  - "packages1/*"
```
表示 我们项目的内容放在 packages 文件夹下面
后面在下载依赖的时候，如果是多个项目的共同的依赖 pnpm install vue -w，就会下载到根目录的 node_modules 里面，如果不是公共的依赖包 pnpm install vue-router ...

pnpm install typescript esbuild（打包） minimist（解析命令行的参数） -D -w

初始化 tsconfig.json 

