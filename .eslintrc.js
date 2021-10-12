module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "quotes": [1, "single"],   // 只能使用单引号
      "no-var": 1,  //禁用var，用let和const代替
      "no-unused-vars": "warn",   // 禁止使用var
      "indent": ["warn", 2],       // 2个字符空格
      "semi": ["error", "never"],   // 禁止末尾使用分号
      "no-multi-spaces": "warn",    // 不能出现多余空格
      "comma-dangle": [1, "never"],  // 对象字面量末尾不能有逗号
      "comma-spacing": 1,    // 对象字面量逗号后要有空格
      "prefer-const": 1,//首选const
      "space-unary-ops": [1, { "words": false, "nonwords": false }]   // 一元运算符的前/后要不要加空格
    }
};