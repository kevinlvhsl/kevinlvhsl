module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        "indent": ["error", 4],
        'import/no-unresolved': 0,
        'no-extra-semi': 0,
        'semi': [2, 'never'],
        'semi-spacing': 0,
        'comma-dangle': ["error", "only-multiline"],
        'no-shadow': ["error", { "allow": ["state"] }],
        'no-param-reassign': 0,
        'space-before-function-paren': 0,
        'global-require': 0,
        'no-console': 0,
        'no-unused-expressions': 0,
        'no-unused-vars': 0,
        'dot-notation': 0,
        'func-names': 0,
        'consistent-return': 0,
        'max-len': 0,
        'eol-last': 0,
        'no-undef': 0,
        'new-cap': 0,
        'camelcase': 0,
        'guard-for-in': 0,
        'radix': 0,
        'no-restricted-syntax': 0,
        'no-extend-native': 0,
        'no-underscore-dangle': 0,
        'no-alert': 0,
        'newline-after-import': 0,
        'no-extraneous-dependencies': 0,
        'prefer-arrow-callback': 0,
        'prefer-template': 0,
        'imports-first': 0,
        'class-methods-use-this': 0,
        'no-extraneous-dependencies': 0,
        'no-mixed-operators': 0,
        'no-plusplus': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}