const config = require('../../config')
const { sdApiKey } = config

/**
 * Creates an basic header object with the API Access Key
 * @return {object} Base header with API Access Key
 */
const requestHeader = () => {
  return {
    headers: {
      'SD-api-key': sdApiKey
    }
  }
}

module.exports = requestHeader
