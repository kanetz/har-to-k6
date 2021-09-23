const entry = require('./entry')

function entries(node, result, hostsSpecs = []) {
  for (const item of node) {
    entry(item, result, hostsSpecs)
  }
}

module.exports = entries
