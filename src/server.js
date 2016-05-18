const koa = require('koa')
const router = require('koa-router')()

const app = koa()

function helper(text) {
  return `Hello ${text}`
}

router.get('/:param?', function* () {
  if (this.params && this.params.param) {
    this.body = {
      content: helper(this.params.param),
    }
  } else {
    this.body = {
      content: helper('World'),
    }
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

export default app
