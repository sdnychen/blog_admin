import js from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import ts from 'typescript-eslint'
import globals from 'globals'

export default [
    js.configs.recommended,
    ...vuePlugin.configs['flat/recommended'],
    ...ts.configs.recommended,
    {
        name: 'default',
        // files: ['**/*.ts'],
        ignores: ['public/*'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                parser: ts.parser,
                sourceType: 'module'
            },
            globals: globals.browser
        },
        linterOptions: {
            noInlineConfig: false,
            reportUnusedDisableDirectives: true
        },
        rules: {
            // 'camelcase': 'error',
            // -------------------- eslint --------------------
            'no-undef': 'off',

            // -------------------- ts --------------------
            '@typescript-eslint/no-unused-expressions': 'off',

            // -------------------- vue --------------------
            'vue/max-attributes-per-line': ['error', {
                'singleline': {
                    'max': 5
                },
                'multiline': {
                    'max': 5
                }
            }],
            'vue/html-indent': ['error', 4, {
                'attribute': 1,
                'baseIndent': 1,
                'closeBracket': 0,
                'alignAttributesVertically': true,
                'ignores': []
            }],
            'vue/multi-word-component-names': 'off',
            'vue/singleline-html-element-content-newline': 'off',

            // -------------------- temp --------------------
            // '@typescript-eslint/no-explicit-any': 'off'
        }
    }
]
