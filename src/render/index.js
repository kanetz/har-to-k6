const prettify = require('./prettify')
const root = require('./root')

function render(result, opts) {
  const raw = root(result, opts)
  return prettify(raw)
}

module.exports = render
