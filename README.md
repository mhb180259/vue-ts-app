# lst-app2.0

### Project setup
```
yarn install

yarn run dev

yarn run build

yarn run lint

yarn run test:unit
```

### Project structure
```
├── build                           # 项目webpack开发与生产配置目录
├── dist                            # 项目build打包压缩编译目录
├── node_modules                    # node.js模块包文件夹
├── public                          # HTML模板
├── src                             # 项目源码，开发目录
  └──assets                         # 静态资源文件夹，放置图片、字体等资源
  └──components                     # 放置项目内所有组件
    └──commons                      # 放置公共组件
      └──index.js                   # 全局绑定复用级别较高的组件
    └──home-view.vue                # 布局组件
  └──config                         # 配置文件夹，放置url等其他全局配置
    └──dataUrl.ts                   # 此文件中的接口数据都是存储在vuex的state中起到缓冲作用以提高响应速度
    └──getUrl.ts                    # 此文件中的接口可以单独调用,例如用户登录，删除等接口调用
  └──decorators                     # 全局装饰器（ts特有）
  └──lang                           # 方式语言文件，国际化
  └──mixins                         # vue全局混入
  └──plugins                        # vue全局插件，绑定到全局this
  └──router                         # 放置路由文件
  └──store                          # 放置全局vuex文件
  └──style                          # 方式样式文件
  └──utils                          # 全局工具方法，Object，Array，window，axios
  └──App.vue                        # 根组件
  └──main.ts                        # 入口文件
  └──.d.ts                          # ts全局申明（ts特有）
├── static                          # 静态配置文件
├── tests                           # 单元测试
├── .browserslistrc                 # 浏览器兼容配置
├── .gitignore                      # GIT忽略的目录或文件
├── .postcssrc                      # postcss配置
└── .babel.config.js                # babel配置
├── package.json                    # NPM包管理配置文件，描述了一个NPM包的所有相关信息，包括作者、简介、包依赖、构建等信息。
├── README.md                       # 显目说明文件，现在你看到的这份文档，就是这个文件下写出来的。
├── tsconfig.json                   # ts配置（allowJs：是否允许使用js）
├── tslint.json                     # tslint配置
├── vue.config.js                   # vue-cli3 webpack配置
```


参考链接<br>
[链接一: vue-cli3.0](https://cli.vuejs.org/zh/)<br>
[链接二: TypeScript官网](https://www.tslang.cn/index.html)<br>
[链接三: ts兼容](https://www.jianshu.com/p/286ceb8e866b)<br>