const path = require('path')
const parse = require('co-body')
const mailchimp = require(path.resolve(process.cwd(), './util/mailchimp'))

module.exports = (router) => {
  const clean = (value) => value.toString().toString('utf-8')

  router.post('/register', function* () {
    const postBody = yield parse(this)
    const data = {
      // possible values: subscribed,unsubscribed,cleaned,pending
      status: 'pending',
      email_address: postBody.email,
      merge_fields: {
        FNAME: clean(postBody.name),
        LNAME: '',
        WORK: clean(postBody.work),
        KTALAGR: clean(postBody.payment),
        KENNITALA: clean(postBody.kennitala),
      },
    }

    mailchimp.post(data).then((body) => {
      this.body = body
    }).catch((body) => {
      this.body = body
    })
  })
}
