export default {
  srcDir: 'src/',
  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
  buildModules: ['@nuxt/typescript-build'],
  build: {
    babel: {
      presets: ['vue-app', { targets: { ie: 9, uglify: true } }],
    },
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
