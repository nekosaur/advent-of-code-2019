const input = `3,8,1005,8,330,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,29,2,9,4,10,1006,0,10,1,1103,17,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,61,1006,0,21,1006,0,51,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,89,1,102,19,10,1,1107,17,10,1006,0,18,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,123,1,9,2,10,2,1105,10,10,2,103,9,10,2,1105,15,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,161,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,182,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,205,2,1102,6,10,1006,0,38,2,1007,20,10,2,1105,17,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,1001,8,0,241,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,263,1006,0,93,2,5,2,10,2,6,7,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,296,1006,0,81,1006,0,68,1006,0,76,2,4,4,10,101,1,9,9,1007,9,1010,10,1005,10,15,99,109,652,104,0,104,1,21102,825594262284,1,1,21102,347,1,0,1105,1,451,21101,0,932855939852,1,21101,358,0,0,1106,0,451,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,1,235152649255,1,21101,405,0,0,1105,1,451,21102,235350879235,1,1,21102,416,1,0,1106,0,451,3,10,104,0,104,0,3,10,104,0,104,0,21102,988757512972,1,1,21101,439,0,0,1106,0,451,21102,1,988669698828,1,21101,0,450,0,1106,0,451,99,109,2,22101,0,-1,1,21102,40,1,2,21102,1,482,3,21102,472,1,0,1106,0,515,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,477,478,493,4,0,1001,477,1,477,108,4,477,10,1006,10,509,1101,0,0,477,109,-2,2106,0,0,0,109,4,1202,-1,1,514,1207,-3,0,10,1006,10,532,21102,1,0,-3,21202,-3,1,1,21202,-2,1,2,21102,1,1,3,21102,1,551,0,1106,0,556,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,579,2207,-4,-2,10,1006,10,579,22101,0,-4,-4,1105,1,647,21201,-4,0,1,21201,-3,-1,2,21202,-2,2,3,21102,598,1,0,1105,1,556,21202,1,1,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,617,21102,1,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,639,21202,-1,1,1,21102,1,639,0,105,1,514,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0`

const LOG = false

const enum Mode {
  POSITION = 0,
  IMMEDIATE = 1,
  RELATIVE = 2
}

const computer = () => {
  const intcode = input.split(',').map(v => parseInt(v, 10))

  let int_ptr = 0
  let value_ptr = 0
  let value_modes: number[] = []
  let opcode = -1
  let rel_ptr = 0

  const read_opcode = () => {
    const digits = intcode[int_ptr].toString().split('')

    opcode = parseInt(digits.slice(-2).join(''), 10)
    value_modes = digits.slice(0, -2).reverse().map(v => parseInt(v, 10))
    value_ptr = 0
  }

  const read_parameter = () => {
    int_ptr += 1
    const m = value_modes[value_ptr] || Mode.POSITION
    value_ptr += 1

    switch (m) {
      case Mode.POSITION: return intcode[int_ptr];
      case Mode.IMMEDIATE: return int_ptr;
      case Mode.RELATIVE: return rel_ptr + intcode[int_ptr];
      default: throw new Error(`Unknown parameter mode! ${m}`)
    }
  }

  const get_value = () => intcode[read_parameter()] || 0
  const get_index = () => read_parameter()

  const ADD = 1
  const MUL = 2
  const IN = 3
  const OUT = 4
  const JNZ = 5
  const JZ = 6
  const CLE = 7
  const CEQ = 8
  const REL = 9
  const HALT = 99

  const instructions: Record<number, Function> = {
    [ADD]: () => {
      const a = get_value()
      const b = get_value()
      const ri = get_index()
      intcode[ri] = a + b
      LOG && console.log('ADD', a, '+', b, '=>', ri, '=', intcode[ri])
      int_ptr += 1
    },
    [MUL]: () => {
      const a = get_value()
      const b = get_value()
      const ri = get_index()
      intcode[ri] = a * b
      LOG && console.log('MUL', a, '*', b, '=>', ri, '=', intcode[ri])
      int_ptr += 1
    },
    [IN]: (input: number) => {
      const ri = get_index()
      LOG && console.log('IN', input, '=>', ri)
      intcode[ri] = input
      int_ptr += 1
    },
    [OUT]: () => {
      const a = get_value()
      LOG && console.log('OUT', '=', a)
      int_ptr += 1
      return a
    },
    [JNZ]: () => {
      const v = get_value()
      const r = get_value()
      const next_ptr = v !== 0 ? r : int_ptr + 1
      LOG && console.log('JNZ', v, v !== 0, '=>', next_ptr)

      int_ptr = next_ptr
    },
    [JZ]: () => {
      const v = get_value()
      const r = get_value()
      LOG && console.log('JZ', v, v === 0, '=>', r)

      int_ptr = v === 0 ? r : int_ptr + 1
    },
    [CLE]: () => {
      const a = get_value()
      const b = get_value()
      const ri = get_index()

      intcode[ri] = a < b ? 1 : 0

      LOG && console.log('CLE', a, '<', b, '=', a < b, 'set', ri)

      int_ptr += 1
    },
    [CEQ]: () => {
      const a = get_value()
      const b = get_value()
      const ri = get_index()

      intcode[ri] = a === b ? 1 : 0

      LOG && console.log('CEQ', a, '===', b, '=', a === b)

      int_ptr += 1
    },
    [REL]: () => {
      const a = get_value()
      rel_ptr += a
      LOG && console.log('REL', rel_ptr, '+', a, '=', rel_ptr + a)
      int_ptr += 1
    }
  }

  function* run () {
    let out: number[] = []
    while (intcode[int_ptr] !== HALT) {
      read_opcode()

      const instruction = instructions[opcode]

      if (!instruction) throw new Error(`Unknown instruction! ${opcode}`)

      switch (opcode) {
        case IN: {
          instruction(yield)
          break
        }
        case OUT: {
          const o = instruction()
          out.push(o)
          yield o
          break
        }
        default: {
          instruction()
          break
        }
      }
    }

    return out
  }

  const it = run()

  return {
    it
  }
}

interface Point {
  x: number
  y: number
}

enum Color {
  BLACK = 0,
  WHITE = 1
}

enum Direction {
  LEFT = 0,
  RIGHT = 1,
}

const DIRECTIONS: Point[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
]

const id = (p: Point) => `${p.x}:${p.y}`

const solve = (initial: number) => {
  const map = new Map<string, number>()
  let pos = { x: 0, y: 0 }
  let dir = 0

  const move = (d: Direction) => {
    const change = d === Direction.LEFT ? -1 : 1
    dir = (DIRECTIONS.length + (dir + change)) % DIRECTIONS.length
    pos = { x: pos.x + DIRECTIONS[dir].x, y: pos.y + DIRECTIONS[dir].y }
  }

  const { it } = computer()

  // set color of initial position
  map.set(id(pos), initial)

  // go to first input
  let result = it.next()

  while (!result.done) {
    // provide input, get output
    result = it.next(map.get(id(pos)))
    map.set(id(pos), result.value)

    // get direction
    result = it.next()
    move(result.value)

    // go to before next input
    result = it.next()
  }

  return [...map.entries()]
}

const part_one = () => {
  console.log('How many panels does it paint at least once?', solve(0).length)
}

const create_range = (range: number, fill: any = 0) => [...Array(range).values()].fill(fill)
const create_canvas = (width: number, height: number, fill = ' ') => create_range(height).map(() => create_range(width, fill))

const part_two = () => {
  const positions = solve(1)
    .filter(([_, value]) => value === Color.WHITE)
    .map(([key]) => ({
      x: parseInt(key.split(':')[0], 10),
      y: parseInt(key.split(':')[1], 10)
    }))

  const WIDTH = Math.max(...positions.map(p => p.x)) + 1
  const HEIGHT = Math.max(...positions.map(p => p.y)) + 1

  const canvas = create_canvas(WIDTH, HEIGHT)

  for (const p of positions) {
    canvas[p.y][p.x] = '#'
  }

  console.log('What registration identifier does it paint on your hull?', `\n${canvas.map(row => row.join('')).join('\n')}`)
}

export {
  part_one,
  part_two
}
