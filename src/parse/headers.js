const header = require('./header')

function headers(node, spec, overrideHosts = []) {
  for (const item of node) {
    header(item, spec, overrideHosts)
  }
}

module.exports = headers
