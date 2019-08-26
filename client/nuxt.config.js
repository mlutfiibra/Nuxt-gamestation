
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Gamestation' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css' }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/sweetalert2@8',
        type: 'text/javascript',
        body: true,
        defer: true,
      },
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        type: 'text/javascript',
        body: true,
        defer: true,
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
        type: 'text/javascript',
        body: true,
        defer: true,
      },
      {
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        type: 'text/javascript',
        body: true,
        defer: true,
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'static/style.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fontawesome.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
