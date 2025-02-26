module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    development: {
      // 开发环境下保留 debugger 语句
      sourceMaps: true,
      retainLines: true
    }
  }
}
