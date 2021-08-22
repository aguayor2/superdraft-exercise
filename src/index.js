const debug = require('debug')('main')

const {
  contestId,
  saveToFileSystem,
  saveToApi
} = require('./config')

const {
  indexPrizes,
  indexScores,
  scoreLineups,
  rankLineups,
  attributePrizes,
  saveAttributtedLineups
} = require('./workers')

const {
  getLineups,
  getContests,
  getPlayScores
} = require('./api')


const runProcess = async () => {
  const startTime = new Date()
  console.log({ startTime })
  const [
    contest,
    lineUps,
    playScores
  ] = await Promise.all([
    getContests(contestId),
    getLineups(contestId),
    getPlayScores(contestId)
  ])

  debug('contest', contest)
  debug('lineUps', lineUps)
  debug('playScores', playScores)

  const [prizesIndex, playScoresIndex] = await Promise.all([
    indexPrizes(contest.prizes),
    indexScores(playScores)
  ])

  // score lineups
  const scoredLineups = await scoreLineups(lineUps, playScoresIndex)
  const rankedLineups = await rankLineups(scoredLineups)
  const attributtedLineups = await attributePrizes(rankedLineups, prizesIndex)
  const saveResult = await saveAttributtedLineups(
    contestId,
    attributtedLineups,
    saveToApi,
    saveToFileSystem
  )

  const endTime = new Date()
  duration = endTime.getTime() - startTime.getTime()
  console.log({ startTime, endTime, duration })

  return saveResult
}

runProcess()
  .then(() => console.log('OK'))
  .catch((err) => console.error(err))
