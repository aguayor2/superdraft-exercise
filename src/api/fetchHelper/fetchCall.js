const debug = require('debug')('fetchCall')
const fetch = require('node-fetch')

/**
 * calls api
 * @param {string} url
 * @param {object} requestInitInfo
 * @return {object} HTTP Response
 */
const fetchCall = async (url, requestInitInfo) => {
  const rawResponse = await fetch(url, requestInitInfo)
  const response = rawResponse.json()
  debug({ url, requestInitInfo }, 'rawResponse', rawResponse)
  const { Errors: error } = response
  if (error) {
    const msg = Array.isArray(error) ? error.join('\n') : error
    throw new Error(msg)
  }
  return response
}

module.exports = fetchCall
