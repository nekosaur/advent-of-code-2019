const INPUT = `109,424,203,1,21101,0,11,0,1105,1,282,21101,0,18,0,1106,0,259,2102,1,1,221,203,1,21102,31,1,0,1105,1,282,21101,38,0,0,1105,1,259,21001,23,0,2,21201,1,0,3,21101,0,1,1,21101,0,57,0,1106,0,303,1202,1,1,222,20102,1,221,3,21002,221,1,2,21101,259,0,1,21102,80,1,0,1106,0,225,21101,0,189,2,21102,91,1,0,1105,1,303,2102,1,1,223,20101,0,222,4,21102,259,1,3,21101,225,0,2,21102,225,1,1,21102,1,118,0,1105,1,225,21001,222,0,3,21102,1,57,2,21102,1,133,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1106,0,259,1202,1,1,223,21001,221,0,4,20101,0,222,3,21101,0,24,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21101,195,0,0,106,0,108,20207,1,223,2,20102,1,23,1,21102,-1,1,3,21101,0,214,0,1106,0,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1201,-4,0,249,22101,0,-3,1,22101,0,-2,2,22102,1,-1,3,21102,250,1,0,1106,0,225,22101,0,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2106,0,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,21201,-2,0,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21201,-2,0,3,21102,343,1,0,1105,1,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,21201,-4,0,1,21101,384,0,0,1106,0,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,22102,1,1,-4,109,-5,2105,1,0`

const LOG = false

const enum Mode {
  POSITION = 0,
  IMMEDIATE = 1,
  RELATIVE = 2
}

type State = {
  int_ptr?: number
  rel_ptr?: number
  memory: number[]
}

const enum Command {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT'
}

const computer = (state: State) => {
  let memory = state.memory

  let int_ptr = state.int_ptr || 0
  let value_ptr = 0
  let value_modes: number[] = []
  let opcode = -1
  let rel_ptr = state.rel_ptr || 0
  let output_buffer: number[] = []

  const read_opcode = () => {
    const digits = memory[int_ptr].toString().split('')

    opcode = parseInt(digits.slice(-2).join(''), 10)
    value_modes = digits.slice(0, -2).reverse().map(v => parseInt(v, 10))
    value_ptr = 0
  }

  const read_parameter = () => {
    int_ptr += 1
    const m = value_modes[value_ptr] || Mode.POSITION
    value_ptr += 1

    switch (m) {
      case Mode.POSITION: return memory[int_ptr];
      case Mode.IMMEDIATE: return int_ptr;
      case Mode.RELATIVE: return rel_ptr + memory[int_ptr];
      default: throw new Error(`Unknown parameter mode! ${m}`)
    }
  }

  const get_value = () => memory[read_parameter()] || 0
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
      memory[ri] = a + b
      LOG && console.log('ADD', a, '+', b, '=>', ri, '=', memory[ri])
      int_ptr += 1
    },
    [MUL]: () => {
      const a = get_value()
      const b = get_value()
      const ri = get_index()
      memory[ri] = a * b
      LOG && console.log('MUL', a, '*', b, '=>', ri, '=', memory[ri])
      int_ptr += 1
    },
    [IN]: (input: number) => {
      const ri = get_index()
      LOG && console.log('IN', input, '=>', ri)
      memory[ri] = input
      int_ptr += 1
    },
    [OUT]: () => {
      const a = get_value()
      LOG && console.log('OUT', '=', a)
      int_ptr += 1
      output_buffer.push(a)
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

      memory[ri] = a < b ? 1 : 0

      LOG && console.log('CLE', a, '<', b, '=', a < b, 'set', ri)

      int_ptr += 1
    },
    [CEQ]: () => {
      const a = get_value()
      const b = get_value()
      const ri = get_index()

      memory[ri] = a === b ? 1 : 0

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
    while (memory[int_ptr] !== HALT) {
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
    it,
    get_state: () => ({
      memory: memory.slice(),
      int_ptr,
      rel_ptr,
    }),
    get_output: () => {
      const tmp = output_buffer.slice()
      output_buffer = []
      return tmp
    },
  }
}

const check_coordinate = (x: number, y: number) => {
  const memory = INPUT.split(',').map(v => parseInt(v, 10))
  const { it } = computer({ memory })
  it.next()
  it.next(x)
  return it.next(y).value
}

const get_char = (type: number) => {
  switch (type) {
    case 0: return '.'
    case 1: return '@'
    case 2: return 'O'
    default: return 'x'
  }
}

interface Point {
  x: number
  y: number
}

const render_part_one = (data: number[], width: number) => {
  let offset = 0
  while (offset < data.length) {
    console.log(data.slice(offset, offset + width).map(get_char).join(''))
    offset += width
  }
}

const find_left_edge = (x: number, y: number) => {
  if (check_coordinate(x, y) === 1) return x
  else if (check_coordinate(x + 1, y) === 1) return x + 1
  else return -1
}

const render_part_two = (pos: Point, size: number) => {
  const padding = size + (size / 4)
  const output: number[] = []
  for (let yy = pos.y - padding; yy < pos.y + padding; yy++) {
    for (let xx = pos.x - padding; xx < pos.x + padding; xx++) {
      const out = check_coordinate(xx, yy)

      if (out === 1 && xx >= pos.x && xx < pos.x + size && yy >= pos.y && yy < pos.y + size) {
        output.push(2)
      } else {
        output.push(out)
      }
    }
  }

  render_part_one(output, padding * 2)
}

const find = (size: number) => {
  let left_edge = 0
  let y = 0
  while (true) {
    const new_left_edge = find_left_edge(left_edge, y)

    if (new_left_edge >= 0) {
      left_edge = new_left_edge

      let x = left_edge
      while (true) {
        if (check_coordinate(x + size - 1, y) == 0) {
          break
        }

        if (check_coordinate(x, y + size - 1) == 1) {
          return { x, y }
        }

        x += 1
      }
    }

    y+= 1
  }
}

const part_one = () => {
  const size = 50
  const output = []

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const active = check_coordinate(x, y)
      output.push(active)
    }
  }

  console.log(`
    How many points are affected by the tractor beam in the 50x50 area closest to the emitter?
    `, output.filter(v => v === 1).length)
}

const part_two = () => {
  const pos = find(100)

  if (!pos) return

  console.log(`
    Find the 100x100 square closest to the emitter that fits entirely within the tractor beam; within that square, find the point closest to the emitter.
    What value do you get if you take that point's X coordinate, multiply it by 10000, then add the point's Y coordinate?
    `, (pos.x * 10000) + pos.y)
}

export {
  part_one,
  part_two
}
