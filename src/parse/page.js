const fixHost = require('./fixHost')
const sleep = require('./sleep')

function pageName(node, hostsSpecs = []) {
  const nameParts = []

  if (node.name) {
    nameParts.push(node.name)
  } else if (node.id) {
    nameParts.push(node.id)
  }

  if (node.title) {
    nameParts.push(fixHost(node.title, hostsSpecs))
  }

  return nameParts.join(' - ')
}

function page(node, result, hostsSpecs = []) {
  const spec = {
    name: pageName(node, hostsSpecs),
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
