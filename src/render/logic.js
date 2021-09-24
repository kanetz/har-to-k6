const block = require('./block')
const declares = require('./declares')
const setupVU = require('./setupVU')
const flow = require('./flow')
const variableSpace = require('./variableSpace')
const defaultSleep = require('./defaultSleep')

function logic(result) {
  const content = [
    declares(result.declares),
    variableSpace(result),
    setupVU(),
    flow(result),
    defaultSleep(result),
  ].filter((item) => item)
  return `export default function main() ${block(content)}`
}

module.exports = logic
