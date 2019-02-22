module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'CSS Houdini Experiments - @iamvdo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Showcase of simple and advanced webdesign effects with the new and shiny CSS Houdini spec.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Didact+Gothic' }
    ],
    bodyAttrs: {
      class: 'language-css'
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'deeppink' },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            rem: false
          }
        }
      }
    },
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
      config.module.rules.push({
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minifyCSS: false
          }
        }],
        exclude: /(node_modules|\.nuxt)/
      })
    },
    vendor: [
      'prismjs',
      '~/plugins/prismjs-keep-markup',
      '~/assets/livecoding.js'
    ]
  },
  css: ['@/assets/prismjs.css'],
  generate: {
    routes: function (cb) {
      const fs = require('fs')
      fs.readdir('./static/posts', (err, files) => {
        const routes = files
        cb(null, routes)
      })
    },
    minify: {
      removeOptionalTags: false,
    }
  },
  plugins: [
    {src: '~/plugins/ga.js', ssr: false}
  ]
}
