const page = require('./page')

function pages(node, result, overrideHosts = []) {
  for (const item of node) {
    page(item, result, overrideHosts)
  }
}

module.exports = pages
