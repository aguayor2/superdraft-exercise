const config = {
  saveToFileSystem: false, // debug
  saveToApi: true,
  contestId: process.env.contestId,
  sdApiKey: process.env.sdApiKey,
  api: {
    baseUrl: 'https://api-candidates.staging.superdraft.io',
    urls: {
      contests: {
        get: (contestId) => {
          return `/api/contests/v1/contests/${contestId}`
        }
      },
      draftTables: {
        get: (contestId) => {
          return `/api/contests/v1/contests/${contestId}/draftables`
        }
      },
      lineups: {
        post: (contestId) => {
          return `/api/lineups/v1/contests/${contestId}/lineups`
        },
        get: (contestId) => {
          return `/api/lineups/v1/contests/${contestId}/lineups`
        },
        put: (contestId) => {
          return `/api/lineups/v1/contests/${contestId}/lineups/scored`
        }
      },
      playerScores: {
        get: (contestId) => {
          return `/api/playerscores/v1/contests/${contestId}/playerscores`
        }
      }
    }
  }
}

module.exports = config
