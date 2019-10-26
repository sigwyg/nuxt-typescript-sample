module.exports = {
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
  }
}
