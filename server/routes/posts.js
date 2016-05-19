const { get } = require('axios')

const mediumUrl = 'https://medium.com/vefidnadurinn/'

module.exports = (router) => {
  router.get('/posts', function* () {
    const { data } = yield get(`${mediumUrl}latest?format=json`)
    const json = JSON.parse(data.substr('])}while(1);</x>'.length))
    this.body = json.payload.posts.map((post) => {
      return {
        title: post.title,
        url: `${mediumUrl}${post.uniqueSlug}`,
        content: post.previewContent.bodyModel.paragraphs[1].text,
        publishedAt: post.firstPublishedAt,
      }
    })
  })
}
