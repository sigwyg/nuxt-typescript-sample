module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  overrides: [
    {
      files: ['*.html', '*.css', '*.scss'],
      options: {
        tabWidth: 4,
      },
    },
    {
      files: ['*.vue'],
      options: {
        parser: 'vue',
      },
    },
  ],
}
