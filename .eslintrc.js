module.exports = {
  extends: [
    'alloy',
    'alloy/typescript',
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
    "no-var": "error",
    "eqeqeq": 2,// 必须使用全等
    "no-multi-spaces": 2, // 不能用多余的空格
    "semi": ["error", "always"],
    "indent": ["error", 2],
  },
};
