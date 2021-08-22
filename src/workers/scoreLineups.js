const scoreLineup = require('./scoreLineup')

/**
 * Scores all lineups
 * @param {Array<object>} allLineups
 * @param {object} playScoresIndex
 * @return {Array<object>} new array of modified lineups
 */
const scoreLineups = async (allLineups = [], playScoresIndex = {}) => {
  const queue = []
  allLineups.forEach((lineup) => {
    const task = scoreLineup(lineup, playScoresIndex)
    queue.push(task)
  })
  const result = await Promise.all(queue)
  return result
}

module.exports = scoreLineups
