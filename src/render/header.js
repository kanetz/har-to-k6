const note = require('./note/items')
const text = require('./text')
const { js, from, unquote } = require('../codegen')

const xsrfTokenTemplate = js`(http.cookieJar().cookiesForURL(${from(
  'url'
)})['XSRF-TOKEN']||[])[0]`

function header(name, items, address) {
  items = [...items]
  return {
    name,
    value:
      name.toLowerCase() == 'X-XSRF-TOKEN'.toLowerCase()
        ? xsrfTokenTemplate({ url: unquote(address) })
        : value(items),
    comment: note(items),
  }
}

function value(items) {
  /*
   * Concatenate values comma separated
   *
   * Supports multivalue headers through the k6 single value interface.
   * Responsibility of the user to only specify multiple values where valid.
   *
   * Per RFC 2616:
   * https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2
   * It MUST be possible to combine the multiple header fields into one
   * "field-name: field-value" pair, without changing the semantics of the
   * message, by appending each subsequent field-value to the first, each
   * separated by a comma.
   */
  const values = items.map((item) => item.value || '')
  return text(values, ',')
}

module.exports = header
