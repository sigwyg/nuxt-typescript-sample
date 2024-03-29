module.exports = {
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
    'plugin:cypress/recommended',
  ],
  plugins: ['vue', 'cypress'],
  rules: {
    'no-console': 'off',
    'prettier/prettier': ['warn'],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
}
