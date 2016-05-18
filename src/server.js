const path = require('path')
const koa = require('koa')
const router = require('koa-router')()

const app = koa()

const glob = require('glob')
glob.sync(path.resolve(process.cwd(), './src/routes/*.js')).forEach((route) => {
  console.log(route)
  require(route)(router)
})

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app
