module.exports = {
  "extends": "eslint:recommended",

  "globals": {
    "setTimeout": "readonly",
    "clearTimeout": "readonly",
    "console": "readonly",
    "setInterveral": "readonly",
    "clearInterval": "readonly",
    "debugger": "readonly"
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
  "rules": {
    "no-debugger": 0
  },
  env: {
    browser: true,
    // ...其他配置
  },
  parser: "vue-eslint-parser",
};