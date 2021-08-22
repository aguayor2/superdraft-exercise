/**
 * Creates map (object | Map<number, number>)
 * one entry per scored player
 * @param {Array<object>} playerScores
 * @return {object} Map
 */
const indexScores = async (playerScores = []) => {
  const scores = {} // use Map<number, number> in typescript
  playerScores.forEach((playerScore) => {
    const { playerId, score } = playerScore
    scores[playerId] = score
  })
  return scores
}

module.exports = indexScores
