module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "parser": "vue-eslint-parser",
    "extends": ["eslint:recommended"],
    "plugins": ["import", "vue", "html"],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        },
        "sourceType": "module",
        "ecmaVersion": 6,
        "parser": "babel-eslint"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": "off",
        "quotes": [
            "error",
            "single"
        ],
        "semi": "off",
        "array-callback-return": "error",
        "brace-style": ["error", "1tbs", {
            "allowSingleLine": true
        }],
        "comma-dangle": [2, "only-multiline"],
        "comma-spacing": ["error"],
        "comma-style": ["error"],
        "indent": "off",
        "key-spacing": ["error"],
        "keyword-spacing": ["error"],
        "lines-around-comment": ["error"],
        "new-cap": ["error"],
        "no-empty-function": ["error"],
        "no-extra-bind": "error",
        "no-floating-decimal": "error",
        "no-multi-spaces": ["error"],
        "no-multiple-empty-lines": ["error", {
            "max": 2,
            "maxBOF": 0,
            "maxEOF": 1
        }],
        "no-self-compare": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-whitespace-before-property": "error",
        "quote-props": ["error", "consistent"],
        "quotes": ["error", "single", {
            "allowTemplateLiterals": true,
            "avoidEscape": true
        }],
        "semi-spacing": ["error"],
        "space-before-blocks": ["error"],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "never"
        }],
        "space-infix-ops": ["error"],
        "spaced-comment": ["error", "always"],
        "valid-jsdoc": 0,

        // 警告
        "dot-notation": ["warn"],
        "no-shadow": ["warn"],
        "no-trailing-spaces": ["warn", {
            "skipBlankLines": true
        }]
    }
};