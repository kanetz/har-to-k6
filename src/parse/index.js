const declares = require('./declares')
const flow = require('./flow')
const imports = require('./imports')
const root = require('./root')
const { result: makeResult } = require('../make')

/*
 * Parse HAR archive
 *
 * Assumes valid archive.
 */
function parse(archive, hostsSpecs = []) {
  const result = makeResult()
  root(archive, result, hostsSpecs)
  flow(result)
  imports(archive, result)
  declares(archive, result)
  return result
}

module.exports = parse
