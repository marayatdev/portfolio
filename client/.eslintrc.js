// .eslintrc.js
module.exports = {
    parser: '@typescript-eslint/parser', // ใช้ TypeScript
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:@typescript-eslint/recommended',
        'prettier' // ปิดกฎที่ Prettier จัดการอยู่แล้ว
    ],
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // เพิ่มกฎ custom ได้ที่นี่
        'react/prop-types': 'off', // ไม่ต้องใช้ prop-types ถ้าใช้ TypeScript
    },
};
