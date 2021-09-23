const page = require('./page')

function pages(node, result, hostsSpecs = []) {
  for (const item of node) {
    page(item, result, hostsSpecs)
  }
}

module.exports = pages
