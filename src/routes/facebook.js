const { get } = require('axios')

const { FB_PAGE, FB_TOKEN } = process.env

const getPicture = (post) => {
  let { picture } = post

  if (post.type === 'photo') {
    if (picture.indexOf('_s') !== -1) {
      return picture.replace(/_s/, '_o');
    } else if (post.object_id) {
      return 'https://graph.facebook.com/' + post.object_id + '/picture?type=normal';
    }
  } else if (picture) {
    var url = picture.match(/(url=|src=)([^$&]*)/);
    if (url) {
      return decodeURIComponent(url[2]);
    }
  }

  // Do not show pictures that are too small
  return null;
}

module.exports = (router) => {
  router.get('/facebook', function* () {
    const { data } = yield get(`https://graph.facebook.com/${FB_PAGE}/feed?fields=object_id,message,picture,link,created_time,type&access_token=${FB_TOKEN}`)
    const posts = data.data
        .filter((post) => post.message)
        .map((post) => {
          return {
            message: post.message,
            picture: getPicture(post),
            publishedAt: post.created_time,
          }
        })
    this.body = posts
  })
}
