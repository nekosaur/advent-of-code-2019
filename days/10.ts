const input = `.#......##.#..#.......#####...#..
...#.....##......###....#.##.....
..#...#....#....#............###.
.....#......#.##......#.#..###.#.
#.#..........##.#.#...#.##.#.#.#.
..#.##.#...#.......#..##.......##
..#....#.....#..##.#..####.#.....
#.............#..#.........#.#...
........#.##..#..#..#.#.....#.#..
.........#...#..##......###.....#
##.#.###..#..#.#.....#.........#.
.#.###.##..##......#####..#..##..
.........#.......#.#......#......
..#...#...#...#.#....###.#.......
#..#.#....#...#.......#..#.#.##..
#.....##...#.###..#..#......#..##
...........#...#......#..#....#..
#.#.#......#....#..#.....##....##
..###...#.#.##..#...#.....#...#.#
.......#..##.#..#.............##.
..###........##.#................
###.#..#...#......###.#........#.
.......#....#.#.#..#..#....#..#..
.#...#..#...#......#....#.#..#...
#.#.........#.....#....#.#.#.....
.#....#......##.##....#........#.
....#..#..#...#..##.#.#......#.#.
..###.##.#.....#....#.#......#...
#.##...#............#..#.....#..#
.#....##....##...#......#........
...#...##...#.......#....##.#....
.#....#.#...#.#...##....#..##.#.#
.#.#....##.......#.....##.##.#.##`

console.log(input)

const rows = input.split('\n')

const WIDTH = rows[0].length
const HEIGHT = rows.length

console.log('WIDTH', WIDTH)
console.log('HEIGHT', HEIGHT)

interface Point {
  x: number
  y: number
}

interface Asteroid extends Point {
  id: number
  c: string
}

const asteroids: Asteroid[] = rows.join('').split('').map((c, i) => ({
  id: i,
  x: i % WIDTH,
  y: Math.floor(i / WIDTH),
  c,
})).filter(p => p.c === '#')

const length = (a: Point, b: Point) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)

const point_on_line_segment = (a: Point, b: Point, c: Point, epsilon = 1e-6) => {
  return Math.abs(length(a, b) - (length(a, c) + length(b, c))) < epsilon
}

// @ts-ignore
const find_unobstructed_asteroids_naive = (asteroids: Asteroid[]) => {
  const lines = []
  for (let i = 0; i < asteroids.length - 1; i++) {
    for (let j = i + 1; j < asteroids.length; j++) {
      lines.push([asteroids[i], asteroids[j]])
    }
  }

  const map: Record<number, number> = {}
  for (const line of lines) {
    const [a, b] = line
    if (!map.hasOwnProperty(a.id)) map[a.id] = asteroids.length - 1
    if (!map.hasOwnProperty(b.id)) map[b.id] = asteroids.length - 1

    for (const c of asteroids) {
      if (c === a || c === b) continue
      if (point_on_line_segment(a, b, c)) {
        map[a.id] -= 1
        map[b.id] -= 1
        break
      }
    }
  }

  let max = 0
  for (const value of Object.values(map)) {
    if (value > max) {
      max = value
    }
  }
  console.log(max)
}

const rad2deg = (r: number) => r * 180 / Math.PI
const vec = (a: Point, b: Point): Point => ({ x: b.x - a.x, y: b.y - a.y })
const vec2rad = (v: Point): number => {
  const r = Math.atan2(v.y, v.x) - Math.atan2(-1, 0)
  return r < 0 ? r + 2 * Math.PI : r
}
const vec2deg = (v: Point): number => rad2deg(vec2rad(v))

const sort_around_origin = (asteroids: Asteroid[], origin: Point) => {
  return [...asteroids].sort((a, b) => {
    const [deg_a, deg_b] = [vec2deg(vec(origin, a)), vec2deg(vec(origin, b))]

    if (deg_a === deg_b) {
      return length(origin, a) - length(origin, b)
    } else {
      return deg_a - deg_b
    }
  })
}

const find_unobstructed_asteroids = (asteroids: Asteroid[], origin: Asteroid) => {
  const unobstructed = []

  let lastAngle = null
  for (let i = 0; i < asteroids.length; i++) {
    const candidate = asteroids[i]

    if (origin.id === candidate.id) continue

    const angle = vec2deg(vec(origin, candidate))

    // Since asteroids are sorted on their angle
    // relative to origin, asteroids on the same
    // line will be processed in a row, and thus
    // we can skip any asteroid with equal angle
    // to the previous one.
    if (lastAngle === angle) {
      continue
    } else {
      lastAngle = angle
      unobstructed.push(candidate)
    }
  }

  return unobstructed
}

interface Best {
  sorted: Asteroid[]
  max: number
  origin: Asteroid | null
}

const solve = () => {
  let best: Best = {
    sorted: [],
    max: 0,
    origin: null
  }

  for (const origin of asteroids) {
    const sorted = sort_around_origin(asteroids, origin)
    const unobstructed = find_unobstructed_asteroids(sorted, origin)

    if (unobstructed.length > best.max) {
      best = {
        sorted,
        max: unobstructed.length,
        origin,
      }
    }
  }

  return best
}

const part_one = () => {
  const { max } = solve()

  console.log('How many other asteroids can be detected from that location?', max)
}


const part_two = (target = 200) => {
  let { sorted, origin } = solve()

  if (!origin) throw new Error('Could not find optimal asteroid')

  let blasted: Asteroid[] = []

  while (blasted.length < target) {
    const unobstructed = find_unobstructed_asteroids(sorted, origin)
    blasted = blasted.concat(unobstructed)
    sorted = sorted.filter(a => !unobstructed.includes(a))
  }

  console.log('The Elves are placing bets on which will be the 200th asteroid to be vaporized.', (blasted[target - 1].x * 100) + blasted[target - 1].y)
}

export {
  part_one,
  part_two
}
