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
const vec = (a: Point, b: Point) => ({ x: b.x - a.x, y: b.y - a.y })
const vec2rad = (v: Point) => {
  const r = Math.atan2(v.y, v.x) - Math.atan2(-1, 0)
  return r < 0 ? r + 2 * Math.PI : r
}
const vec2deg = (v: Point) => rad2deg(vec2rad(v))

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
  const sorted = sort_around_origin(asteroids, origin)

  let lastAngle = null
  for (let i = 0; i < sorted.length; i++) {
    const candidate = sorted[i]

    if (origin.id === candidate.id) continue

    const angle = vec2deg(vec(origin, candidate))

    if (lastAngle === angle) {
      continue
    } else {
      lastAngle = angle
      unobstructed.push(candidate)
    }
  }

  return unobstructed
}

const part_one = () => {
  let max = []
  for (const origin of asteroids) {
    const unobstructed = find_unobstructed_asteroids(asteroids, origin)

    if (unobstructed.length > max.length) {
      max = unobstructed
    }
  }

  console.log('How many other asteroids can be detected from that location?', max.length)
}

const part_two = () => {
  const target = 200
  let max = []
  let p = null
  let asteroids_left = asteroids.slice()
  for (const origin of asteroids) {
    const unobstructed = find_unobstructed_asteroids(asteroids, origin)

    if (unobstructed.length > max.length) {
      max = unobstructed
      p = origin
    }
  }

  if (!p) throw new Error('Could not find optimal asteroid')

  let blasted: Asteroid[] = []

  while (blasted.length < target) {
    const unobstructed = find_unobstructed_asteroids(asteroids_left, p)
    blasted = [...blasted, ...unobstructed]
    asteroids_left = asteroids.filter(a => !unobstructed.includes(a))
  }

  console.log('The Elves are placing bets on which will be the 200th asteroid to be vaporized.', (blasted[target - 1].x * 100) + blasted[target - 1].y)
}

export {
  part_one,
  part_two
}
