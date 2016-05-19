const fetch = require('node-fetch')

module.exports = (router) => {
  router.get('/posts', function* () {
    console.log('sending request')
    const data = yield fetch('https://medium.com/vefidnadurinn/latest?format=json')
    const text = yield data.text()
    const json = JSON.parse(text.substr('])}while(1);</x>'.length))
    this.body = json.payload.posts.map((post) => {
      return {
        title: post.title,
        slug: post.slug,
        content: post.previewContent.bodyModel.paragraphs[1].text,
        publishedAt: post.firstPublishedAt,
      }
    })
  })
}
