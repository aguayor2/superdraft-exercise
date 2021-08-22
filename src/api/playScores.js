const { contestId: defaultContestId, api } = require('../config')
const { requestHeader, fetchCall } = require('./fetchHelper')

/**
 * Gets Play Scores
 * @param {number} contestId as int32
 * @return {Array<object>} Play Scores
 */
const getPlayScores = async (contestId = defaultContestId) => {
  const url = api.baseUrl + api.urls.playerScores.get(contestId)
  const headers = requestHeader()
  const response = await fetchCall(url, headers)
  return response
}

module.exports = {
  getPlayScores
}
