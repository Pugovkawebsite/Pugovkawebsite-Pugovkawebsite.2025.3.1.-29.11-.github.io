module.exports = {
  root: true, 
  env: {
    node: true, 
  },
  extends: [
    'plugin:vue/vue3-essential', 
    'eslint:recommended',        
  ],
  parserOptions: {
    ecmaVersion: 2020, 
  },
  rules: {
    
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', 
    'vue/no-unused-vars': 'error', 
    'indent': ['error', 2], 
    'quotes': ['error', 'single'], 
    'semi': ['error', 'always'], 
  },
};