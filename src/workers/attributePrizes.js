const debug = require('debug')('attributePrizes')

/**
 * Attributes prizes
 * @param {Array<object>} rankLineups
 * @param {object} prizesIndex
 * @return {Array<Array>} sorted Array of Array<Lineup>
 */
const attributePrizes = async (rankLineups = [], prizesIndex = {}) => {
  // sort keys
  const sortedKeysByPoints = Object.keys(rankLineups) // Array<string>
  sortedKeysByPoints.sort((a, b) => {
    return Number(b) - Number(a) // convert string to number before comparing
  })

  const result = []
  let lastPosition = 0
  sortedKeysByPoints.forEach((val) => {
    const bucket = rankLineups[val]
    const { lineups } = bucket
    const countInPosition = lineups.length

    const position = lastPosition + 1
    lastPosition += countInPosition

    let groupPrizeAmount = 0
    for (let i = 0; i < countInPosition; i++) {
      const prizePosition = position + i
      const prizeInstance = prizesIndex[prizePosition]
      if (prizeInstance) {
        groupPrizeAmount += prizeInstance.amount
      }
    }

    const prizeEach = groupPrizeAmount > 0 ?
      Number((groupPrizeAmount / countInPosition).toFixed(2)) : 0

    // debug
    bucket.groupPrizeAmount = groupPrizeAmount
    bucket.count = countInPosition
    bucket.prizeEach = prizeEach
    debug(bucket)

    // update lineups position, total winnings and add to results
    lineups.forEach((lineup) => {
      lineup.position = position
      lineup.totalWinnings = prizeEach
      result.push(lineup)
    })
  })
  return result
}

module.exports = attributePrizes
