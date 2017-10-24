const config = require('./config.json')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: config.blogTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
      { name: 'renderer', content: 'webkit' },
      { name: 'theme-color', content: '#fff' },
      { hid: 'description', name: 'description', content: config.blogDescription },
      { name: 'keyword', content: config.blogKeyword }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: 'vue-style-loader!css-loader!stylus-loader'
          }
        }
      }
    ],
    vender: [
      'axios',
      'front-matter',
      'marked',
      'normalize.css',
      'prismjs',
      'timeago.js'
    ]
  },
  css: [
    { src: '~assets/common.styl', lang: 'stylus' }
  ],
  plugins: [
    '~plugins/axios',
    '~plugins/filter'
  ]
}
