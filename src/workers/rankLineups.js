/**
 * Ranks all lineups
 * @param {Array<object>} allLineups
 * @return {Array<Array>} sorted Array of Array<Lineup>
 */
const rankLineups = async (allLineups = []) => {
  const pointsIndex = {}
  allLineups.forEach((lineup) => {
    const { points } = lineup
    let bucket = pointsIndex[points]
    if (!bucket) {
      bucket = {
        lineups: []
      }
      pointsIndex[points] = bucket
    }
    bucket.lineups.push(lineup)
  })
  return pointsIndex
}

module.exports = rankLineups
