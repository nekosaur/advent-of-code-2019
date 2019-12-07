const input = `1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,9,19,23,1,6,23,27,1,10,27,31,1,5,31,35,2,6,35,39,1,5,39,43,1,5,43,47,2,47,6,51,1,51,5,55,1,13,55,59,2,9,59,63,1,5,63,67,2,67,9,71,1,5,71,75,2,10,75,79,1,6,79,83,1,13,83,87,1,10,87,91,1,91,5,95,2,95,10,99,2,9,99,103,1,103,6,107,1,107,10,111,2,111,10,115,1,115,6,119,2,119,9,123,1,123,6,127,2,127,10,131,1,131,6,135,2,6,135,139,1,139,5,143,1,9,143,147,1,13,147,151,1,2,151,155,1,10,155,0,99,2,14,0,0`

const arr = input.split(',').map(v => parseInt(v, 10))

const ADD = 1
const MUL = 2

const run = (arr: number[], noun: number, verb: number) => {
  arr[1] = noun
  arr[2] = verb

  let pos = 0
  while (arr[pos] !== 99) {
    const [op, ai, bi, ri] = arr.slice(pos)

    switch (op) {
      case ADD: {
        arr[ri] = arr[ai] + arr[bi]
        break
      }
      case MUL: {
        arr[ri] = arr[ai] * arr[bi]
      }
    }

    pos += 4
  }

  return arr
}

const solve = (noun: number, verb: number) => run(arr.slice(), noun, verb)[0]

const part_one = () => console.log('What value is left at position 0:', solve(12, 2))

const part_two = () => {
  const find = () => {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        if (solve(i, j) === 19690720) {
          return 100 * i + j
        }
      }
    }

    return null
  }

  console.log('What is 100 * noun + verb?', find())
}


export {
  part_one,
  part_two
}
