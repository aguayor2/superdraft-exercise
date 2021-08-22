const { contestId: defaultContestId, api } = require('../config')
const { requestHeader, fetchCall } = require('./fetchHelper')

/**
 * Gets Contest
 * @param {number} contestId as int32
 * @return {object} Contest
 */
const getContests = async (contestId = defaultContestId) => {
  const url = api.baseUrl + api.urls.contests.get(contestId)
  const headers = requestHeader()
  const response = await fetchCall(url, headers)
  return response
}

/**
 * Gets Draftables
 * @param {number} contestId as int32
 * @return {Array<object>} Draftables
 */
const getDraftables = async (contestId = defaultContestId) => {
  const url = api.baseUrl + api.urls.draftTables.get(contestId)
  const headers = requestHeader()
  const response = await fetchCall(url, headers)
  return response
}

module.exports = {
  getContests,
  getDraftables
}
