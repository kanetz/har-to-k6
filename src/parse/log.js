const browser = require('./browser')
const creator = require('./creator')
const entries = require('./entries')
const pages = require('./pages')
const options = require('./options')

function log(node, result, overrideHosts = []) {
  if (node.options) {
    options(node.options, result)
  }
  if (node.creator) {
    creator(node.creator, result)
  }
  if (node.browser) {
    browser(node.browser, result)
  }
  if (node.comment) {
    result.comment.push(node.comment)
  }
  if (node.pages) {
    pages(node.pages, result, overrideHosts)
  }
  if (node.entries) {
    entries(node.entries, result, overrideHosts)
  }
}

module.exports = log
