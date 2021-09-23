const fixHost = require('./fixHost')
const sleep = require('./sleep')

function pageName(node, overrideHosts = []) {
  const nameParts = []

  if (node.name) {
    nameParts.push(node.name)
  } else if (node.id) {
    nameParts.push(node.id)
  }

  if (node.title) {
    nameParts.push(fixHost(node.title, overrideHosts))
  }

  return nameParts.join(' - ')
}

function page(node, result, overrideHosts = []) {
  const spec = {
    name: pageName(node, overrideHosts),
  }

  if (node.comment) {
    spec.comment = node.comment
  }

  if (node.sleep) {
    spec.sleep = sleep(node.sleep)
  }

  result.pages.set(node.id, spec)
}

module.exports = page
