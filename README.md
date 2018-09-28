# vue-ssr-demo

> 基于`webpack4`构建的`vue`服务端渲染模板，服务端渲染主要是为了优化`seo`及首屏渲染，搭建过程中难免会遇到一些问题，基本翻翻文档再参考一下`vue-hackernews-2.0`都比较好解决，这里就简单记录下对`async css`的注入优化

### 运行
```
yarn or npm install

# development
npm run dev

# production
npm run build
npm start
```

### 特性
- `eslint`规范代码
- `store`注入解决`cookie`共享
- `commit`时使用`lint-staged`+`husky·对修改部分规范化
- 支持`stylus`

### 异步chunk的css注入优化
在`webpack3+`的时候，一般都是用`extract-text-webpack-plugin`去提取`css`的，到了`webpack4+`就推荐使用`mini-css-extract-plugin`来提取(也可以使用`extract-text-webpack-plugin@next`版，不推荐)

当用`import()`去做代码分割的时候，`mini-css-extract-plugin`会把这个`async chunk`中的`css`提取成一个单独的`css`文件，在服务端渲染的时候会自动注入资源，但是在注入`css`时，会把`vue-ssr-client-manifest.json`中所有的`css`资源(`initial`和`async`)都注入进去，假如有页面A-E，都用`import()`去做代码分割，不管渲染那个页面,都会得到如下结果
```
<link rel="stylesheet" href="/pageA.css">
<link rel="stylesheet" href="/pageB.css">
<link rel="stylesheet" href="/pageC.css">
<link rel="stylesheet" href="/pageD.css">
<link rel="stylesheet" href="/pageE.css">
```
这样的话就有4个请求是多余的，也会浪费流量，增加首屏时间，去参考下[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)的话，会发现是没有这个问题的，因为`vue-hackernews-2.0`使用的是`extract-text-webpack-plugin`，并且`fallback`是设置`vue-style-loader`去处理的，这样会把`async chunk`中的`css`打包到`js`中，服务端渲染是会把这部分`css`直接内联到`html`中返回，那这里用的是`webpack4+`，不用`extract-text-webpack-plugin`的话只能寻找其他方法了。

那服务端渲染时只注入需要的`css`，就需要知道当前是渲染那个页面，然后在找到对应的资源手动注入，通过调试发现经过`vue-loader`处理后的组件会带有`__file="xxx.vue"`，里面的值就是组件的源文件名，通过这个`__file`属性，到打包出的`js`中去匹配查找就可以找出组件对应的`chunkName`，而这部分的`js`和`css`的`chunkName`是一样的，这样就可以找出组件对应的`css`资源了

但是这套方案也是不完美的，只能处理页面级组件的样式（一般以页面做代码分割，就能满足大部分项目了），如果里面还有`import()`的子组件，这部分的`css`就没法注入了。具体代码查看`build/asyncInjectAssets.js`和`server.js`
