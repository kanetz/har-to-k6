const parse = require('./parse')
const render = require('./render')
const validate = require('./validate')
const normalize = require('./normalize')
const { DEFAULT_OPTIONS } = require('./constants')

async function convert(archive, options = DEFAULT_OPTIONS) {
  const source = normalize(archive, options)

  validate(source)

  const overrideHostsSpecs = options.overrideHosts
    .split(',')
    .map((s) => {
      const spec = s.split('=')
      return {
        src: spec[0],
        dest: spec[1],
      }
    })
    .filter((s) => s.src && s.dest)
  const result = parse(source, overrideHostsSpecs)

  // NOTE: => render(result) instead of { main: render(result) } ??
  // Then /bin/har-to-k6.js need to change as well.
  return {
    main: render(result),
  }
}

module.exports = convert
