const { js } = require('../../../codegen')

const template = js`
  response => {
    const body = response.json()
    const successCodes = [0, 1]
    const success = response.status < 400 && successCodes.includes(body.code)
    if(!success) {
      console.error(
        'CODING Api failed:', response.request.method, response.request.url,
        "-", response.status_text, "-", JSON.stringify(body),
      )
    }
    return success
  }
`

function CODING(name, { comment }) {
  return {
    name: 'CODING Api succeeded',
    comment,
    value: template({}),
  }
}

module.exports = CODING
