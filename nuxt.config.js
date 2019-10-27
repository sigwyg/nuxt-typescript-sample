export default {
  srcDir: 'src/',
  rootDir: './',
  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
  head: {
    title: 'nuxt-ts-form sample',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
  },
  /**
   * Global CSS
   */
  css: ['normalize.css/normalize.css', { src: '~/assets/styles/main.scss', lang: 'scss' }],
  /**
   * build
   */
  buildModules: ['@nuxt/typescript-build'],
  build: {
    extractCSS: true,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
