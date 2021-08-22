/**
 * Scores a lineup
 * @param {object} lineup
 * @param {object} playScoresIndex
 * @return {object} modified lineup
 */
const scoreLineup = async (lineup, playScoresIndex) => {
  const { players } = lineup
  let lineupScore = 0

  players.forEach((lineUpPlayer) => {
    const { playerId, multiplier } = lineUpPlayer

    const score = playScoresIndex[playerId] || 0
    const newScore = Number((multiplier * score).toFixed(2))

    lineUpPlayer.score = newScore
    lineupScore += newScore
  })

  // README: swagger shows model Lineup with field points instead of score
  lineup.points = Number(lineupScore.toFixed(2))
  return lineup
}

module.exports = scoreLineup
