const fs = require('fs')
const { putLineups } = require('../api')
const { contestId: defaultContestId } = require('../config')

/**
 * Attributes prizes
 * @param {number} contestId
 * @param {Array<object>} attributtedLineups
 * @param {boolean} saveToApi
 * @param {boolean} saveToFileSystem
 * @return {Array<object>} a result per task
 */
const saveAttributtedLineups = async (
  contestId = defaultContestId,
  attributtedLineups = [],
  saveToApi = false,
  saveToFileSystem = false
) => {
  const queue = []
  if (saveToApi) {
    queue.push(putLineups(
      attributtedLineups,
      contestId
    ))
  }
  if (saveToFileSystem) {
    queue.push(sendToFileSystem(
      attributtedLineups, contestId
    ))
  }
  if (queue.length) {
    const result = await Promise.all(queue)
    return result
  } else {
    return []
  }
}

/**
 * DEBUG - writes results to file for testing
 * @param {Array<object>} lineUps
 * @param {number} contestId
 * @return {Promise<Array<object>>}
 */
const sendToFileSystem = async (lineUps, contestId) => {
  const queue = []
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data')
  }
  lineUps.forEach((lineUp) => {
    const task = new Promise((resolve, reject) => {
      const { lineupId } = lineUp
      const file = `data/attributed_lineup_${contestId}_${lineupId}.json`
      fs.writeFile(
        file,
        JSON.stringify(lineUp),
        (err) => {
          if (err) return reject(err)
          return resolve(lineUp)
        }
      )
    })
    queue.push(task)
  })
  if (queue.length) {
    const result = await Promise.all(queue)
    return result
  } else {
    return []
  }
}

module.exports = saveAttributtedLineups
