const entry = require('./entry')

function entries(node, result, overrideHosts = []) {
  for (const item of node) {
    entry(item, result, overrideHosts)
  }
}

module.exports = entries
