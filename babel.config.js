// 在产品发布阶段移除console在开发阶段不移除
const prodplugins = []
if(process.env.NODE_ENV === 'production'){
  prodplugins.push('transform-remove-console')
}

module.exports = {
  'presets': [
    '@vue/cli-plugin-babel/preset'
  ],
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ],
    // ...对象展开运算符,将数组中每一项展开放入另一个数组中
    ...prodplugins
  ]
}
