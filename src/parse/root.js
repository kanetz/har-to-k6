const log = require('./log')

function root(node, result, overrideHosts = []) {
  log(node.log, result, overrideHosts)
}

module.exports = root
