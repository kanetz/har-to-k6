function fixHost(value, overrideHosts = []) {
  const firstMatchedSpec = overrideHosts.find((spec) =>
    value.includes(spec.src)
  )

  return firstMatchedSpec
    ? value.replace(firstMatchedSpec.src, firstMatchedSpec.dest)
    : value
}

module.exports = fixHost
