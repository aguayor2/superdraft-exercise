/**
 * Creates maps (objects | Map<number, Prize>)
 * range - index by range item from {from} to {to}
 * - saved reference of Prize object per value for fast search
 * @param {Array<object>} prizes
 * @return {object} two maps
 */
const indexPrizes = async (prizes = []) => {
  const result = {} // use Map<number, Prize> in typescript
  prizes.forEach((prize) => {
    const { from, to } = prize
    // map index by <from, to>
    for (let i = from; i <= to; i++) {
      result[i] = prize // ref of prize, not a clone
    }
  })
  return result
}

module.exports = indexPrizes
