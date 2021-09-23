const { isBlacklistedHeader } = require('../aid')
const fixHost = require('./fixHost')

function header(node, spec, overrideHosts = []) {
  const item = {}

  if (node.name && node.name[0] === ':') {
    return
  }

  if (isBlacklistedHeader(node.name)) {
    return
  }

  if (node.value) {
    item.value = fixHost(node.value, overrideHosts)
  }

  if (node.comment) {
    item.comment = node.comment
  }

  if (!spec.has(node.name)) {
    spec.set(node.name, new Set())
  }

  spec.get(node.name).add(item)
}

module.exports = header
