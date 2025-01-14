const { SleepPlacement } = require('../enum')
const { DEFAULT_OPTIONS } = require('../constants')
const { nanoid } = require('nanoid')
const MIN_SLEEP = 500

/**
 * Validate that archive has a list of entries that all have a `startedDateTime` property
 * @param {HAR} archive
 * @return {boolean}
 */
function isValidArchive(archive) {
  return (
    !!archive &&
    !!archive.log &&
    !!archive.log.entries &&
    archive.log.entries.every((entry) => !!entry.startedDateTime)
  )
}

/**
 *
 * @param {HAR} draft
 * @return {TimelineNode[]}
 */
function getTimeline(draft) {
  const { entries } = draft.log

  let timeline = []
  for (const entry of entries) {
    const { startedDateTime } = entry
    const node = { id: nanoid(), date: new Date(startedDateTime), entry }
    timeline.push(node)

    // Check if there is a reason to exit
    if (Number.isNaN(node.date.valueOf())) {
      return null
    }
  }

  return timeline.sort((nodeA, nodeB) => {
    return nodeA.date - nodeB.date
  })
}

/**
 *
 * @param {TimelineNode} node
 * @param {TimelineNode[]} timeline
 * @return {Array|boolean}
 */
function getSleep(node, timeline) {
  if (node.entry.sleep) {
    return false
  }

  const nextIndex = timeline.findIndex((item) => item.id === node.id) + 1
  const nextNode = timeline[nextIndex]
  if (!nextNode) {
    return false
  }

  const offset = nextNode.date - node.date
  let milliseconds = 0
  if (offset) {
    milliseconds = Math.round(offset / 100) * 100 || null
  }

  if (milliseconds >= MIN_SLEEP) {
    return [{ [SleepPlacement.After]: milliseconds }]
  }

  return false
}

/**
 *
 * @param {Entry} entry
 * @return {Entry}
 */
function getEntry(entry) {
  if (
    !entry.request ||
    !entry.request.url ||
    !entry.request.url.includes('/api/') ||
    entry.checks
  ) {
    return entry
  }

  return {
    ...entry,
    checks: [
      {
        type: 999,
      },
    ],
  }
}

/**
 *
 * @param {TimelineNode[]} timeline
 * @param {{ addSleep?: boolean }} options
 * @return {Entry[]}
 */
function getEntries(timeline, options, hostsSpecs) {
  return timeline
    .filter(
      (node) =>
        !options.excludeExternalHosts ||
        hostsSpecs.find((spec) => {
          const url = node.entry.request.url
          return url.substr(0, url.lastIndexOf('/')).includes(spec.src)
        })
    )
    .map((node) => {
      if (options.addSleep) {
        const sleep = getSleep(node, timeline)
        if (sleep) {
          return {
            ...getEntry(node.entry),
            sleep,
          }
        }
      }

      return getEntry(node.entry)
    })
}

/**
 *
 * @param {HAR} archive
 * @param {{ addSleep?: boolean }} options
 * @return {HAR}
 */
function normalize(archive, options = DEFAULT_OPTIONS, hostsSpecs = []) {
  // Return archive if it doesnt pass validation
  if (!isValidArchive(archive)) {
    return archive
  }

  const timeline = getTimeline(archive)

  // Return archive if timeline couldn't be created
  if (!timeline) {
    return archive
  }

  // Rebuild archive
  return {
    ...archive,
    log: {
      options: {
        thresholds: {
          checks: ['rate==1.0'],
          http_req_failed: ['rate==0.0'],
        },
      },
      ...archive.log,
      entries: getEntries(timeline, options, hostsSpecs),
    },
  }
}

module.exports = normalize
