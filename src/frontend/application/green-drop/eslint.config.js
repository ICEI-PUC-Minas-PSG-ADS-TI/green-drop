const { defineConfig } = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const react = require("eslint-plugin-react");
const reactNative = require("eslint-plugin-react-native");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const pkg = require('@eslint/js');
const { configs } = pkg;

const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

// __dirname is available in CommonJS
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: configs.recommended,
    allConfig: configs.all
});

module.exports = defineConfig([{
    extends: compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-native/all",
        "plugin:@typescript-eslint/recommended",
    ),

    languageOptions: {
        parser: tsParser,
    },

    plugins: {
        react,
        "react-native": reactNative,
        "@typescript-eslint": typescriptEslint,
    },

    rules: {
        "react-native/no-inline-styles": "warn",
        "react-native/no-unused-styles": "warn",

        "react-native/sort-styles": ["error", "asc", {
            ignoreClassNames: false,
        }],

        "@typescript-eslint/no-unused-vars": "warn",
        "no-console": "warn",
    },

    settings: {
        react: {
            version: "detect",
        },
    },
}]);

// Jest environment for test files
module.exports.push({
    files: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    languageOptions: {
        globals: {
            jest: true,
            describe: true,
            it: true,
            expect: true,
            beforeAll: true,
            afterAll: true,
            beforeEach: true,
            afterEach: true,
        },
    },
});