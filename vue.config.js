// vue-cli3默认隐藏了webpack的配置,用户想要自定义webpack要新建一个vue.config.js文件
module.exports = {
  // 修改默认打包入口:
  chainWebpack: config => {
    // 发布模式:
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', {
        vue: 'Vue',
        'element-ui': 'ElementUI',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vuex: 'Vuex',
        nprogress: 'NProgress',
      })

      config.plugin('html').tap(args=>{
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args=>{
        args[0].isProd = false
        return args
      })
    })
  },

  runtimeCompiler: true,
  publicPath: './', //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
  outputDir: 'dist', //build输出目录
  assetsDir: 'static', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  devServer: {
    /**
     * 这一块是devServer的配置，可以参考https://webpack.js.org/configuration/dev-server/
     * (可选，根据自己情况来设置)
     */
    open: true, //浏览器自动打开页面
    host: '127.0.0.1', //本地服务器访问的路径
    port: 8090, //本地服务器访问的端口
    https: false, //是否使用https协议
    hotOnly: false, //是否开启热更新
    /**
     * vue-cli3跨域的全配置！
     */
    proxy: {
      /**
       * 根目录跨域访问方式
       */
      '/article': {
        //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
        //同一个域名只能设置一次跨域，否则重复报错！
        // target: 'http://127.0.0.1:8080/',
        target: 'http://dxd.natapp1.cc',
        changeOrigin: true, //是否跨域，设置为true;(必须)
        ws: true,
        /**(可选设置----如果访问域名根目录，那这里必须设置重定向了)
         * 是否要把'/article'目录重定向去哪里，跟目录还是其他（可选）
         * 如果设置了,那在axios的路径中/article替换成https://baike.baidu.com/相当于根目录一样！
         *  */
        pathRewrite: {
          '^/article': '' //设置/article路径重定向为根目录"/";
        }
      }
    }
  }
};
