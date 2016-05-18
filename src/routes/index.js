
module.exports = (router) => {
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
}
