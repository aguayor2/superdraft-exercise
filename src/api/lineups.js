const { contestId: defaultContestId, api } = require('../config')
const { requestHeader, fetchCall } = require('./fetchHelper')

/**
 * Gets Lineups
 * @param {number} contestId as int32
 * @return {Array<object>} Lineups
 */
const getLineups = async (contestId = defaultContestId) => {
  const url = api.baseUrl + api.urls.lineups.get(contestId)
  const headers = requestHeader()
  const response = await fetchCall(url, headers)
  return response
}

/**
 * Post or Puts - helper to send Lineups to api
 * @param {string} verb HTTP verb POST or PUT
 * @param {string} url API's URL
 * @param {object} body Lineups
 * @return {object} HTTP Response
 */
const saveLineups = async (verb, url, body = {}) => {
  const baseHeaders = requestHeader()
  const headers = {
    'method': verb,
    'Content-Type': 'application/json',
    ...baseHeaders,
    'body': JSON.stringify(body)
  }
  const response = await fetchCall(url, headers)
  return response
}

/**
 * Post new Lineups
 * @param {Array<object>} lineUpItems
 * @param {number} contestId as int32
 * @return {object} HTTP Response
 */
const postLineups = async (
  lineUpItems = [],
  contestId = defaultContestId
) => {
  const url = api.baseUrl + api.urls.lineups.post(contestId)
  const body = {
    items: lineUpItems
  }
  const response = await saveLineups('post', url, lineUpItems, body)
  return response
}

/**
 * Puts (updates) Lineups
 * @param {Array<object>} lineUps
 * @param {number} contestId as int32
 * @return {object} HTTP Response
 */
const putLineups = async (
  lineUps = [],
  contestId = defaultContestId
) => {
  const url = api.baseUrl + api.urls.lineups.put(contestId)
  const body = lineUps
  const response = await saveLineups('put', url, body)
  return response
}

module.exports = {
  getLineups,
  postLineups,
  putLineups
}
