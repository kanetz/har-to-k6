const parse = require('./parse')
const render = require('./render')
const validate = require('./validate')
const normalize = require('./normalize')
const { DEFAULT_OPTIONS } = require('./constants')

async function convert(archive, options = DEFAULT_OPTIONS) {
  const hostsSpecs = options.hosts
    .split(',')
    .map((s) => {
      const spec = s.split('=')
      return {
        src: spec[0],
        dest: spec[1],
      }
    })
    .filter((s) => s.src)

  const source = normalize(archive, options, hostsSpecs)

  validate(source)

  const result = parse(source, hostsSpecs)

  // NOTE: => render(result) instead of { main: render(result) } ??
  // Then /bin/har-to-k6.js need to change as well.
  return {
    main: render(result, options),
  }
}

module.exports = convert
