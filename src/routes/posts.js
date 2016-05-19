const { get } = require('axios')

module.exports = (router) => {
  router.get('/posts', function* () {
    const { data } = yield get('https://medium.com/vefidnadurinn/latest?format=json')
    const json = JSON.parse(data.substr('])}while(1);</x>'.length))
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
