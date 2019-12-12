const INPUT = `<x=-3, y=10, z=-1>
<x=-12, y=-10, z=-5>
<x=-9, y=0, z=10>
<x=7, y=-5, z=-3>`

const REGEXP = new RegExp(/[xyz]=(-?\d+)/g)
const NUM_MOONS = 4
const NUM_AXIS = 3

const create_range = (range: number): any[] => [...Array(range).keys()]

function* primes (): Generator<number, number> {
  let n = 2

  const is_prime = (p: number) => {
    for (let i = 2; i <= Math.sqrt(p); i++) {
      if (p % i === 0) return false
    }
    return true
  }

  while (true) {
    if (is_prime(n)) yield n
    n += 1
  }
}

const lcm = (arr: number[]) => {
  const it = primes()
  const divisors = []

  let divided = 0
  let p = it.next().value
  while (!arr.every(n => n === 1)) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % p === 0) {
        arr[i] = arr[i] / p
        divided += 1
      }
    }

    if (divided > 0) {
      divisors.push(p)
    } else {
      p = it.next().value
    }
    divided = 0
  }

  return divisors.reduce((a, b) => a * b)
}

const check = (positions: number[], velocities: number[], goal: number[]) => {
  for (let i = 0; i < goal.length; i++) {
    if (goal[i] !== positions[i]) return false
    if (velocities[i] !== 0) return false
  }

  return true
}

function* steps_until_initial_state (positions: number[]): Generator<number, number> {
  const goal = positions.slice()
  const velocities = create_range(4).fill(0)

  let steps = 0
  while (true) {
    steps += 1

    for (let i = 0; i < NUM_MOONS; i++) {
      for (let j = i + 1; j < NUM_MOONS; j++) {
        if (positions[i] < positions[j]) {
          velocities[i] += 1
          velocities[j] -= 1
        } else if (positions[i] > positions[j]) {
          velocities[i] -= 1
          velocities[j] += 1
        }
      }
      positions[i] = positions[i] + velocities[i]
    }

    if (check(positions, velocities, goal)) {
      yield steps
    }
  }
}

const change = (positions: number[], velocities: number[], a: number, b: number) => {
  if (positions[a] < positions[b]) {
    velocities[a] += 1
    velocities[b] -= 1
  } else if (positions[a] > positions[b]) {
    velocities[a] -= 1
    velocities[b] += 1
  }
}

enum Axis {
  X = 0,
  Y = 1,
  Z = 2
}

const part_one = () => {
  const positions = INPUT.split('\n').reduce<number[]>((curr, line, i) => {
    let match = REGEXP.exec(line)
    let j = 0
    while (match != null) {
      curr[j + (i * 3)] = parseInt(match[1], 10)
      match = REGEXP.exec(line)
      j += 1
    }
    return curr
  }, [])

  const velocities = create_range(NUM_AXIS * NUM_MOONS).fill(0)

  let steps = 0
  let ke = 0

  while (steps < 1000) {
    ke = 0
    for (let i = 0; i < NUM_MOONS; i++) {
      const a = (3 * i)
      for (let j = i + 1; j < NUM_MOONS; j++) {
        const b = (3 * j)
        change(positions, velocities, Axis.X + a, Axis.X + b)
        change(positions, velocities, Axis.Y + a, Axis.Y + b)
        change(positions, velocities, Axis.Z + a, Axis.Z + b)
      }
      positions[Axis.X + a] = positions[Axis.X + a] + velocities[Axis.X + a]
      positions[Axis.Y + a] = positions[Axis.Y + a] + velocities[Axis.Y + a]
      positions[Axis.Z + a] = positions[Axis.Z + a] + velocities[Axis.Z + a]

      ke += positions.slice(a, a + NUM_AXIS).reduce((a, b) => a + Math.abs(b), 0) * velocities.slice(a, a + NUM_AXIS).reduce((a, b) => a + Math.abs(b), 0)
    }

    steps += 1
  }

  console.log('What is the total energy in the system after simulating the moons given in your scan for 1000 steps?', ke)
}

const part_two = () => {
  const positions = INPUT.split('\n').reduce<number[][]>((curr, line) => {
    let match = REGEXP.exec(line)
    let index = 0
    while (match != null) {
      curr[index].push(parseInt(match[1], 10))
      match = REGEXP.exec(line)
      index += 1
    }
    return curr
  }, [[], [], []])

  const digits: number[] = []

  for (let i = 0; i < NUM_AXIS; i++) {
    const it = steps_until_initial_state(positions[i])
    digits.push(it.next().value)
  }

  console.log('How many steps does it take to reach the first state that exactly matches a previous state?', lcm(digits))
}

export {
  part_one,
  part_two
}
