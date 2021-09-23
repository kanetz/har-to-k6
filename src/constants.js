const DEFAULT_OPTIONS = {
  addSleep: false,
  hosts: '',
}

const DEFAULT_CLI_OPTIONS = {
  ...DEFAULT_OPTIONS,
  output: 'loadtest.js',
}

module.exports = {
  DEFAULT_OPTIONS,
  DEFAULT_CLI_OPTIONS,
}
