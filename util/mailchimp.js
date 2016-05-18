const request = require('request')
const btoa = require('btoa')

const mailchimp = {}

mailchimp.post = function (data) {
  return new Promise((resolve, reject) => {
    const apikey = process.env.MAILCHIMP_API_KEY
    const listID = process.env.MAILCHIMP_LIST_ID
    if (!apikey || !listID) {
      reject()
      return
    }
    const username = 'svef'
    const apiserver = apikey.split('-')[1]

    const jsondata = JSON.stringify(data).toString('utf-8')

    const options = {
      method: 'post',
      uri: `https://${apiserver}.api.mailchimp.com/3.0/lists/${listID}/members`,
      headers: {
        Authorization: `Basic ${btoa(`${username}:${apikey}`)}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: jsondata,
    }

    request(options, (err, res) => {
      let exists = false
      try {
        let jsonbody = JSON.parse(res.body)
        jsonbody = jsonbody.title.toString().toLowerCase().trim()
        if (jsonbody === 'member exists') {
          exists = true
        }
      } catch (exc) {
        console.error(exc)
      }
      if (err || res.statusCode !== 200) {
        reject({ request_data: jsondata, result: (err || res), exists })
      } else {
        resolve({ request_data: jsondata, result: res, exists })
      }
    })
  })
}

module.exports = mailchimp
