const INPUT = `1,330,331,332,109,4014,1101,1182,0,15,1102,1,1429,24,1001,0,0,570,1006,570,36,1002,571,1,0,1001,570,-1,570,1001,24,1,24,1106,0,18,1008,571,0,571,1001,15,1,15,1008,15,1429,570,1006,570,14,21101,58,0,0,1106,0,786,1006,332,62,99,21101,333,0,1,21101,0,73,0,1106,0,579,1101,0,0,572,1102,1,0,573,3,574,101,1,573,573,1007,574,65,570,1005,570,151,107,67,574,570,1005,570,151,1001,574,-64,574,1002,574,-1,574,1001,572,1,572,1007,572,11,570,1006,570,165,101,1182,572,127,1001,574,0,0,3,574,101,1,573,573,1008,574,10,570,1005,570,189,1008,574,44,570,1006,570,158,1105,1,81,21101,0,340,1,1105,1,177,21101,0,477,1,1105,1,177,21101,514,0,1,21102,176,1,0,1106,0,579,99,21102,1,184,0,1105,1,579,4,574,104,10,99,1007,573,22,570,1006,570,165,102,1,572,1182,21101,375,0,1,21101,211,0,0,1106,0,579,21101,1182,11,1,21102,222,1,0,1105,1,979,21101,0,388,1,21102,1,233,0,1105,1,579,21101,1182,22,1,21102,1,244,0,1106,0,979,21101,401,0,1,21101,255,0,0,1106,0,579,21101,1182,33,1,21102,1,266,0,1106,0,979,21102,1,414,1,21102,277,1,0,1106,0,579,3,575,1008,575,89,570,1008,575,121,575,1,575,570,575,3,574,1008,574,10,570,1006,570,291,104,10,21101,0,1182,1,21102,1,313,0,1105,1,622,1005,575,327,1102,1,1,575,21102,1,327,0,1106,0,786,4,438,99,0,1,1,6,77,97,105,110,58,10,33,10,69,120,112,101,99,116,101,100,32,102,117,110,99,116,105,111,110,32,110,97,109,101,32,98,117,116,32,103,111,116,58,32,0,12,70,117,110,99,116,105,111,110,32,65,58,10,12,70,117,110,99,116,105,111,110,32,66,58,10,12,70,117,110,99,116,105,111,110,32,67,58,10,23,67,111,110,116,105,110,117,111,117,115,32,118,105,100,101,111,32,102,101,101,100,63,10,0,37,10,69,120,112,101,99,116,101,100,32,82,44,32,76,44,32,111,114,32,100,105,115,116,97,110,99,101,32,98,117,116,32,103,111,116,58,32,36,10,69,120,112,101,99,116,101,100,32,99,111,109,109,97,32,111,114,32,110,101,119,108,105,110,101,32,98,117,116,32,103,111,116,58,32,43,10,68,101,102,105,110,105,116,105,111,110,115,32,109,97,121,32,98,101,32,97,116,32,109,111,115,116,32,50,48,32,99,104,97,114,97,99,116,101,114,115,33,10,94,62,118,60,0,1,0,-1,-1,0,1,0,0,0,0,0,0,1,18,18,0,109,4,2101,0,-3,586,21001,0,0,-1,22101,1,-3,-3,21101,0,0,-2,2208,-2,-1,570,1005,570,617,2201,-3,-2,609,4,0,21201,-2,1,-2,1105,1,597,109,-4,2106,0,0,109,5,1201,-4,0,630,20102,1,0,-2,22101,1,-4,-4,21102,1,0,-3,2208,-3,-2,570,1005,570,781,2201,-4,-3,653,20102,1,0,-1,1208,-1,-4,570,1005,570,709,1208,-1,-5,570,1005,570,734,1207,-1,0,570,1005,570,759,1206,-1,774,1001,578,562,684,1,0,576,576,1001,578,566,692,1,0,577,577,21102,1,702,0,1106,0,786,21201,-1,-1,-1,1105,1,676,1001,578,1,578,1008,578,4,570,1006,570,724,1001,578,-4,578,21101,731,0,0,1105,1,786,1105,1,774,1001,578,-1,578,1008,578,-1,570,1006,570,749,1001,578,4,578,21102,756,1,0,1106,0,786,1106,0,774,21202,-1,-11,1,22101,1182,1,1,21101,0,774,0,1105,1,622,21201,-3,1,-3,1106,0,640,109,-5,2106,0,0,109,7,1005,575,802,21002,576,1,-6,20101,0,577,-5,1105,1,814,21101,0,0,-1,21102,1,0,-5,21101,0,0,-6,20208,-6,576,-2,208,-5,577,570,22002,570,-2,-2,21202,-5,47,-3,22201,-6,-3,-3,22101,1429,-3,-3,2101,0,-3,843,1005,0,863,21202,-2,42,-4,22101,46,-4,-4,1206,-2,924,21102,1,1,-1,1106,0,924,1205,-2,873,21102,1,35,-4,1105,1,924,1202,-3,1,878,1008,0,1,570,1006,570,916,1001,374,1,374,2102,1,-3,895,1101,2,0,0,2101,0,-3,902,1001,438,0,438,2202,-6,-5,570,1,570,374,570,1,570,438,438,1001,578,558,921,21002,0,1,-4,1006,575,959,204,-4,22101,1,-6,-6,1208,-6,47,570,1006,570,814,104,10,22101,1,-5,-5,1208,-5,55,570,1006,570,810,104,10,1206,-1,974,99,1206,-1,974,1101,0,1,575,21101,973,0,0,1105,1,786,99,109,-7,2106,0,0,109,6,21101,0,0,-4,21101,0,0,-3,203,-2,22101,1,-3,-3,21208,-2,82,-1,1205,-1,1030,21208,-2,76,-1,1205,-1,1037,21207,-2,48,-1,1205,-1,1124,22107,57,-2,-1,1205,-1,1124,21201,-2,-48,-2,1105,1,1041,21102,-4,1,-2,1105,1,1041,21102,-5,1,-2,21201,-4,1,-4,21207,-4,11,-1,1206,-1,1138,2201,-5,-4,1059,1201,-2,0,0,203,-2,22101,1,-3,-3,21207,-2,48,-1,1205,-1,1107,22107,57,-2,-1,1205,-1,1107,21201,-2,-48,-2,2201,-5,-4,1090,20102,10,0,-1,22201,-2,-1,-2,2201,-5,-4,1103,1202,-2,1,0,1105,1,1060,21208,-2,10,-1,1205,-1,1162,21208,-2,44,-1,1206,-1,1131,1105,1,989,21101,439,0,1,1105,1,1150,21102,1,477,1,1106,0,1150,21101,0,514,1,21102,1,1149,0,1106,0,579,99,21102,1157,1,0,1105,1,579,204,-2,104,10,99,21207,-3,22,-1,1206,-1,1138,1201,-5,0,1176,1201,-4,0,0,109,-6,2105,1,0,14,11,36,1,9,1,36,1,9,1,9,7,20,1,9,1,9,1,5,1,20,1,9,1,9,1,5,1,20,1,9,1,9,1,5,1,20,1,9,1,9,1,5,1,20,1,9,1,9,1,5,1,20,1,9,11,5,1,20,1,25,1,20,11,15,7,24,1,21,1,20,7,19,1,20,1,3,1,1,1,19,1,20,1,3,1,1,1,19,1,20,1,3,1,1,1,19,1,20,1,3,1,1,1,11,9,20,1,3,1,1,1,11,1,26,11,9,1,28,1,3,1,1,1,1,1,9,1,28,1,3,7,7,1,28,1,5,1,1,1,1,1,7,1,18,11,5,11,1,1,18,1,17,1,1,1,5,1,1,1,18,1,17,1,1,1,5,1,1,1,18,1,17,1,1,1,5,1,1,1,18,1,17,11,18,1,19,1,5,1,12,9,19,7,12,1,46,1,46,1,46,1,46,1,46,7,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,38,9,38,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,11,36`

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

const NEWLINE = '\n'.charCodeAt(0)
const SCAFFOLD = '#'.charCodeAt(0)
const INTERSECTION = 'O'.charCodeAt(0)

const read_map = (it: Generator, get_output: () => number[]): number[] => {
  let finished = 2
  while (finished > 0) {
    const result = it.next()

    if (result.value === NEWLINE) {
      finished -= 1
    } else {
      finished = 2
    }
  }

  return get_output()
}

const part_one = () => {
  const { it, get_output } = computer({ memory: INPUT.split(',').map(v => parseInt(v, 10)) })

  const map = read_map(it, get_output)

  const width = map.indexOf(NEWLINE) + 1
  let alignment = 0

  for (let i = 0; i < map.length; i++) {
    if (
      map[i] === SCAFFOLD &&
      map[i - 1] === SCAFFOLD &&
      map[i + 1] === SCAFFOLD &&
      map[i + width] === SCAFFOLD &&
      map[i - width] === SCAFFOLD
    ) {
      map[i] = INTERSECTION
      alignment += ((i % width) * Math.floor(i / width))
    }
  }

  console.log(map.map(v => String.fromCharCode(v)).join(''))
  console.log('What is the sum of the alignment parameters for the scaffold intersections?', alignment)
}

const input_sequence = (it: Generator, sequence: string) => {
  console.log('-- Sending input:', sequence)
  const arr = sequence.split('')
  for (let i = 0; i < arr.length; i++) {
    it.next(arr[i].charCodeAt(0))
  }
}

const wait_for_newline = (it: Generator) => {
  while (true) {
    const result = it.next()
    if (result.value === NEWLINE) {
      break
    }
  }
}

// The inputs were done by hand
const part_two = () => {
  const memory = INPUT.split(',').map(v => parseInt(v, 10))
  memory[0] = 2
  const { it, get_output } = computer({ memory })

  const read_line = () => {
    wait_for_newline(it)
    get_output().map(v => String.fromCharCode(v)).join('')
    it.next()
  }

  // read map
  read_map(it, get_output)

  // read first input line
  console.log(read_line())

  // main movement
  input_sequence(it, 'A,B,B,A,C,B,C,C,B,A\n')

  // read second input line
  console.log(read_line())

  input_sequence(it, 'R,10,R,8,L,10,L,10\n')

  // read third input line
  console.log(read_line())

  input_sequence(it, 'R,8,L,6,L,6\n')

  // read fourth input line
  console.log(read_line())

  input_sequence(it, 'L,10,R,10,L,6\n')

  // read fifth input line
  console.log(read_line())

  input_sequence(it, 'n\n')

  // read final map
  console.log(read_map(it, get_output).map(v => String.fromCharCode(v)).join(''))

  console.log('After visiting every part of the scaffold at least once, how much dust does the vacuum robot report it has collected?', it.next().value)
}

export {
  part_one,
  part_two
}
