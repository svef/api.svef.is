const { post } = require('axios')
const qs = require('qs')

const { SLACK_ORG, SLACK_TOKEN } = process.env

module.exports = (router) => {
  router.post('/slack', function* () {
    const params = this.request.body

    console.log(`Inviting ${params.email} to ${SLACK_ORG} Slack`)
    if (!params.email) {
      return;
    }

    const result = yield post(`https://${SLACK_ORG}.slack.com/api/users.admin.invite`, qs.stringify({
      token: SLACK_TOKEN,
      email: params.email,
      set_active: 'true',
    }))

    this.response.body = result.data
  })
}
