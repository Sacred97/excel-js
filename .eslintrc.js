module.exports = {
    parser: "@babel/eslint-parser",
    parserOptions: {
        babelOptions: {
            configFile: "./babel.config.json",
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        "jest/globals": true
    },
    extends: ["eslint:recommended", "google"],
    plugins: ["jest"],
    rules: {
        'semi': 'off',
        'comma-dangle': 'off',
        'require-jsdoc': 'off'
    }
};
