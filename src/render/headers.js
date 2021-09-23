const header = require('./header')
const object = require('./object')

function headers(spec, address) {
  if (spec.size) {
    const entries = [...spec].map(([name, items]) =>
      header(name, items, address)
    )
    return object(entries)
  } else {
    return null
  }
}

module.exports = headers
