const input = `3,8,1001,8,10,8,105,1,0,0,21,42,51,76,93,110,191,272,353,434,99999,3,9,1002,9,2,9,1001,9,3,9,1002,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,3,9,4,9,99,3,9,1002,9,4,9,101,5,9,9,1002,9,3,9,1001,9,4,9,1002,9,5,9,4,9,99,3,9,1002,9,5,9,101,3,9,9,102,5,9,9,4,9,99,3,9,1002,9,5,9,101,5,9,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99`

const enum Mode {
  POSITION = 0,
  IMMEDIATE = 1
}

const LOG = false

const computer = (phase: number) => {
  const intcode = input.split(',').map(v => parseInt(v, 10))

  let int_ptr = 0
  let value_ptr = 0
  let value_modes: number[] = []
  let opcode = -1

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

  const ADD = 1
  const MUL = 2
  const IN = 3
  const OUT = 4
  const JNZ = 5
  const JZ = 6
  const CLE = 7
  const CEQ = 8
  const HALT = 99

  const instructions: Record<number, Function> = {
    [ADD]: () => {
      const a = read_value()
      const b = read_value()
      const ri = read_value(Mode.IMMEDIATE)
      intcode[ri] = a + b
      LOG && console.log('ADD', a, '+', b, '=>', ri, '=', intcode[ri])
      int_ptr += 1
    },
    [MUL]: () => {
      const a = read_value()
      const b = read_value()
      const ri = read_value(Mode.IMMEDIATE)
      LOG && console.log('MUL', a, '*', b, '=>', ri, '=', intcode[ri])
      intcode[ri] = a * b
      int_ptr += 1
    },
    [IN]: (input: number) => {
      const ri = read_value(Mode.IMMEDIATE)
      LOG && console.log('IN', input, '=>', ri)
      intcode[ri] = input
      int_ptr += 1
    },
    [OUT]: () => {
      const ri = read_value(Mode.IMMEDIATE)
      LOG && console.log('OUT', ri, '=', intcode[ri])
      int_ptr += 1
      return intcode[ri]
    },
    [JNZ]: () => {
      const v = read_value()
      const r = read_value()
      LOG && console.log('JNZ', v, v !== 0, '=>', r)

      int_ptr = v !== 0 ? r : int_ptr + 1
    },
    [JZ]: () => {
      const v = read_value()
      const r = read_value()
      LOG && console.log('JZ', v, v === 0, '=>', r)

      int_ptr = v === 0 ? r : int_ptr + 1
    },
    [CLE]: () => {
      const a = read_value()
      const b = read_value()
      const ri = read_value(Mode.IMMEDIATE)

      intcode[ri] = a < b ? 1 : 0

      LOG && console.log('CLE', a, '<', b, '=', a < b)

      int_ptr += 1
    },
    [CEQ]: () => {
      const a = read_value()
      const b = read_value()
      const ri = read_value(Mode.IMMEDIATE)

      intcode[ri] = a === b ? 1 : 0

      LOG && console.log('CEQ', a, '===', b, '=', a === b)

      int_ptr += 1
    },
  }

  function* run () {
    let out = 0
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
          out = instruction()
          yield out
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
  // kick start iterator to first input
  it.next()
  // set phase
  it.next(phase)

  return {
    it
  }
}

const combinations = <T>(array: T[]) => {
  function p(array: T[], temp: T[]) {
    if (!array.length) {
      result.push(temp);
    }
    for (let i = 0; i < array.length; i++) {
      const x = array.splice(i, 1)[0];
      p(array, temp.concat(x));
      array.splice(i, 0, x);
    }
  }

  var result: T[][] = [];
  p(array, []);
  return result;
}

const loop = (phases: number[]) => {
  const { it: a } = computer(phases[0])
  const { it: b } = computer(phases[1])
  const { it: c } = computer(phases[2])
  const { it: d } = computer(phases[3])
  const { it: e } = computer(phases[4])

  let a_in: IteratorResult<number | undefined> = { value: 0, done: false }
  let result: IteratorResult<number | undefined> = { value: 0, done: false }

  while (!result.done) {
    let a_out = a.next(a_in.value)
    let b_out = b.next(a_out.value)
    let c_out = c.next(b_out.value)
    let d_out = d.next(c_out.value)
    a_in = e.next(d_out.value)
    // let each computer run until next input
    a.next()
    b.next()
    c.next()
    d.next()
    result = e.next()
  }

  return result.value
}

const solve = (p: number[]) => {
  const c = combinations(p)
  let max = 0
  for (let i = 0; i < c.length; i++) {
    const phases = c[i]
    const power = loop(phases)

    if (power > max) {
      max = power
    }
  }

  return max
}

const part_one = () => console.log('What is the highest signal that can be sent to the thrusters?', solve([0, 1, 2, 3, 4]))
const part_two = () => console.log('What is the highest signal that can be sent to the thrusters? (feedback loop)', solve([5, 6, 7, 8, 9]))

export {
  part_one,
  part_two
}
