const input = `3,225,1,225,6,6,1100,1,238,225,104,0,1101,91,67,225,1102,67,36,225,1102,21,90,225,2,13,48,224,101,-819,224,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1101,62,9,225,1,139,22,224,101,-166,224,224,4,224,1002,223,8,223,101,3,224,224,1,223,224,223,102,41,195,224,101,-2870,224,224,4,224,1002,223,8,223,101,1,224,224,1,224,223,223,1101,46,60,224,101,-106,224,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1001,191,32,224,101,-87,224,224,4,224,102,8,223,223,1001,224,1,224,1,223,224,223,1101,76,90,225,1101,15,58,225,1102,45,42,224,101,-1890,224,224,4,224,1002,223,8,223,1001,224,5,224,1,224,223,223,101,62,143,224,101,-77,224,224,4,224,1002,223,8,223,1001,224,4,224,1,224,223,223,1101,55,54,225,1102,70,58,225,1002,17,80,224,101,-5360,224,224,4,224,102,8,223,223,1001,224,3,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,677,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1108,677,226,224,1002,223,2,223,1006,224,344,101,1,223,223,107,677,226,224,1002,223,2,223,1006,224,359,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,374,1001,223,1,223,108,226,677,224,1002,223,2,223,1006,224,389,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,404,1001,223,1,223,1108,677,677,224,1002,223,2,223,1005,224,419,101,1,223,223,1008,226,677,224,102,2,223,223,1006,224,434,101,1,223,223,107,226,226,224,102,2,223,223,1005,224,449,1001,223,1,223,1007,677,677,224,1002,223,2,223,1006,224,464,1001,223,1,223,1007,226,226,224,1002,223,2,223,1005,224,479,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,494,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,509,101,1,223,223,1107,677,677,224,102,2,223,223,1005,224,524,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,539,101,1,223,223,1107,677,226,224,1002,223,2,223,1006,224,554,101,1,223,223,1007,677,226,224,1002,223,2,223,1005,224,569,101,1,223,223,7,677,226,224,1002,223,2,223,1006,224,584,101,1,223,223,107,677,677,224,1002,223,2,223,1005,224,599,1001,223,1,223,8,226,677,224,1002,223,2,223,1005,224,614,101,1,223,223,7,677,677,224,1002,223,2,223,1006,224,629,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,644,101,1,223,223,108,226,226,224,102,2,223,223,1005,224,659,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226`

const enum Mode {
  POSITION = 0,
  IMMEDIATE = 1
}

const LOG = false

const computer = (inputs: number[]) => {
  const intcode = input.split(',').map(v => parseInt(v, 10))
  const HALT = 99

  let int_ptr = 0
  let value_ptr = 0
  let value_modes: number[] = []
  let opcode = HALT

  const read_opcode = () => {
    const digits = intcode[int_ptr].toString().split('')

    opcode = parseInt(digits.slice(-2).join(''), 10)
    value_modes = digits.slice(0, -2).reverse().map(v => parseInt(v, 10))
    value_ptr = 0
  }

  const read_value = (mode: Mode = Mode.POSITION) => {
    int_ptr += 1
    const m = value_modes[value_ptr] != null ? value_modes[value_ptr] : mode
    const ptr = m === Mode.POSITION ? intcode[int_ptr] : int_ptr
    value_ptr += 1
    return intcode[ptr]
  }

  const ADD = () => {
    const a = read_value()
    const b = read_value()
    const ri = read_value(Mode.IMMEDIATE)
    intcode[ri] = a + b
    LOG && console.log('ADD', a, '+', b, '=>', ri, '=', intcode[ri])
    int_ptr += 1
  }

  const MUL = () => {
    const a = read_value()
    const b = read_value()
    const ri = read_value(Mode.IMMEDIATE)
    LOG && console.log('MUL', a, '*', b, '=>', ri, '=', intcode[ri])
    intcode[ri] = a * b
    int_ptr += 1
  }

  const IN = () => {
    const ri = read_value(Mode.IMMEDIATE)
    // const input = prompt('IN')
    const input = inputs.shift()
    if (typeof input === 'undefined') throw new Error('missing input')
    LOG && console.log('IN', input, '=>', ri)
    intcode[ri] = input
    int_ptr += 1
  }

  const OUT = () => {
    const ri = read_value(Mode.IMMEDIATE)
    LOG && console.log('OUT', ri, '=', intcode[ri])
    int_ptr += 1
    return intcode[ri]
  }

  const JNZ = () => {
    const v = read_value()
    const r = read_value()
    LOG && console.log('JNZ', v, v !== 0, '=>', r)

    int_ptr = v !== 0 ? r : int_ptr + 1
  }

  const JZ = () => {
    const v = read_value()
    const r = read_value()
    LOG && console.log('JZ', v, v === 0, '=>', r)

    int_ptr = v === 0 ? r : int_ptr + 1
  }

  const CLE = () => {
    const a = read_value()
    const b = read_value()
    const ri = read_value(Mode.IMMEDIATE)

    intcode[ri] = a < b ? 1 : 0

    LOG && console.log('CLE', a, '<', b, '=', a < b)

    int_ptr += 1
  }

  const CEQ = () => {
    const a = read_value()
    const b = read_value()
    const ri = read_value(Mode.IMMEDIATE)

    intcode[ri] = a === b ? 1 : 0

    LOG && console.log('CEQ', a, '===', b, '=', a === b)

    int_ptr += 1
  }

  const instructions: Record<number, () => void> = {
    1: ADD,
    2: MUL,
    3: IN,
    4: OUT,
    5: JNZ,
    6: JZ,
    7: CLE,
    8: CEQ,
  }

  const run = () => {
    let output = null

    while (intcode[int_ptr] !== HALT) {
      read_opcode()

      const instruction = instructions[opcode]

      if (!instruction) throw new Error(`Unknown instruction! ${opcode}`)

      output = instruction()
    }

    return output
  }

  return {
    run
  }
}

const part_one = () => console.log('What is the diagnostic code for system ID 1?', computer([1]).run())
const part_two = () => console.log('What is the diagnostic code for system ID 5?', computer([5]).run())

export {
  part_one,
  part_two
}
