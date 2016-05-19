const path = require('path')
const koa = require('koa')
const router = require('koa-router')()
const glob = require('glob')

const app = koa()

// eslint-disable-next-line global-require
glob.sync(path.resolve(process.cwd(), './src/routes/*.js')).forEach((route) => require(route)(router))

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app
