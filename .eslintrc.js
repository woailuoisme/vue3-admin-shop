module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  plugins: [
    'vue',
  ],
  parser: 'vue-eslint-parser',
  ignorePatterns: ['src/@iconify/*.js', 'node_modules', 'dist', '*.d.ts'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended','plugin:promise/recommended',],
  rules: {
    // "no-console": process.env.NODE_ENV === "prod" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "prod" ? "error" : "off",

    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': [
      0,
      {
        ignoreRestSiblings: true,
      },
    ],
    // ESLint plugin vue
    'vue/v-on-event-hyphenation':'off',
    'vue/block-tag-newline': 'error',
    'vue/component-api-style': 'error',
    // --fix  component in template name to  kebab-case  PascalCase  camelCase  Snake_case
    'vue/component-name-in-template-casing': ['error', "kebab-case", { registeredComponentsOnly: false }],
    // --fix  component in template name to  kebab-case
    'vue/custom-event-name-casing': ['error', 'camelCase', {
      ignores: [
        '/^(click):[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/',
      ],
    }],
    'vue/define-macros-order': 'error',
    'vue/html-comment-content-newline': 'error',
    'vue/html-comment-content-spacing': 'error',
    'vue/html-comment-indent': 'error',
    'vue/match-component-file-name': 'error',
    'vue/no-child-content': 'error',
    'vue/multi-word-component-names': 'off',

    // NOTE this rule only supported in SFC,  Users of the unplugin-vue-define-options should disable that rule: https://github.com/vuejs/eslint-plugin-vue/issues/1886
    // 'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-empty-component-block': 'off',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/v-on-function-call': 'error',

    // -- Extension Rules
    'vue/no-irregular-whitespace': 'error',
    'vue/template-curly-spacing': 'error',
    'vue/max-attributes-per-line': 'off',
    'vue/no-template-shadow': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-unused-components': 'warn',
    'vue/no-mutating-props': 'warn',
    'vue/html-self-closing': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'space-before-function-paren': [0, 'always'],
    'no-unused-expressions': [
      0,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
    'arrow-body-style': [0, 'never'],
    'func-names': 0,
    'prefer-const': 0,
    'no-extend-native': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-eval': 0,
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,

    // Plugin: eslint-plugin-promise
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',

  },
}
