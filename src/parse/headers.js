const header = require('./header')

function headers(node, spec, hostsSpecs = []) {
  for (const item of node) {
    header(item, spec, hostsSpecs)
  }
}

module.exports = headers
