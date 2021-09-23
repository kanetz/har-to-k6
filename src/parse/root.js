const log = require('./log')

function root(node, result, hostsSpecs = []) {
  log(node.log, result, hostsSpecs)
}

module.exports = root
