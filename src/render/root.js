const imports = require('./imports')
const lead = require('./lead')
const logic = require('./logic')
const options = require('./options')

function root(result, opts) {
  return [
    lead(result),
    imports(result.imports, opts),
    options(result),
    logic(result, opts),
  ]
    .filter((item) => item)
    .join(`\n\n`)
}

module.exports = root
