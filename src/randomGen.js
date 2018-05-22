const getRanges = buffs => {
  const ranges = buffs.slice()
  ranges[0] = 0
  for (let i = 0; i < ranges.length - 1; i++) {
    ranges[i + 1] = ranges[i] + buffs[i]
  }
  ranges.push(ranges[buffs.length - 1] + buffs[buffs.length - 1])
  return ranges
}

const throwDice = ranges => Math.random() * ranges[ranges.length - 1]

const locateRange = (ranges, dice) => {
  for (let i = 0; i < ranges.length - 1; i++) {
    if (ranges[i] <= dice && ranges[i + 1] > dice) {
      return i;
    }
  }
  return -1
}

const randomGen = buffs => {
  const ranges = getRanges(buffs)
  const dice = throwDice(ranges)
  return locateRange(ranges, dice)
}

export default randomGen
