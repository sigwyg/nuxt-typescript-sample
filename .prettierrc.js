module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  tabWidth: 2,
  overrides: [
    {
      files: ['*.html', '*.scss', '*.css'],
      options: {
        tabWidth: 4,
      },
    },
  ],
}
