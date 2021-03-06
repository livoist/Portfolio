module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    entry: './src/main.js',
    // alias set
    resolve: {
      alias: {
        '@c': '@/components',
        '@css': '@/assets/sass/main.sass',
        '@img': '@/assets/img'
      }
    }
  },
  css: {
    // import global sass mixins
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/sass/_mixin.sass"`
      }
    }
  },
  // allow ngrok server
  devServer: {
    allowedHosts: ['.ngrok.io'],
    disableHostCheck: true
  }
}
