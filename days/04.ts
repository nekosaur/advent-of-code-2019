const range = [284639, 748759]

const isValid = (n: number, strict?: boolean) => {
  const digits = n.toString().split('').map(d => parseInt(d, 10))

  let groups = new Map()
  for (let i = 0; i < digits.length - 1; i++) {
    const [a, b] = digits.slice(i, i + 2);
    if (b < a) return false

    if (b === a) {
      groups.set(a, (groups.get(a) || 1) + 1)
    }
  }

  const fn = strict ? (v: number) => v === 2 : (v: number) => v >= 2

  return !!Array.from(groups.values()).find(fn)
}

const solve = (strict?: boolean) => {
  let valid = 0
  for (let i = range[0]; i <= range[1]; i++) {
    if (isValid(i, strict)) valid += 1
  }
  return valid
}

const part_one = () => console.log('How many different passwords within the range given in your puzzle input meet the criteria for part one?', solve())
const part_two = () => console.log('How many different passwords within the range given in your puzzle input meet the criteria for part two?', solve(true))

export {
  part_one,
  part_two
}
