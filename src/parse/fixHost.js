function fixHost(value, specs = []) {
  const spec = specs.find((spec) => value.includes(spec.src))

  return spec && spec.dest ? value.replace(spec.src, spec.dest) : value
}

module.exports = fixHost
