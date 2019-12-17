const INPUT = `59791875142707344554745984624833270124746225787022156176259864082972613206097260696475359886661459314067969858521185244807128606896674972341093111690401527976891268108040443281821862422244152800144859031661510297789792278726877676645835805097902853584093615895099152578276185267316851163313487136731134073054989870018294373731775466754420075119913101001966739563592696702233028356328979384389178001923889641041703308599918672055860556825287836987992883550004999016194930620165247185883506733712391462975446192414198344745434022955974228926237100271949068464343172968939069550036969073411905889066207300644632441054836725463178144030305115977951503567`

function* sequence (count = 1): Generator<number, number> {
  const base = [0, 1, 0, -1]
  let index = 1
  let repeat = count

  while (true) {
    yield base[index]
    repeat -= 1

    if (repeat === 0) {
      index = (index + 1) % base.length
      repeat = count
    }
  }
}

const fft = (input: number[]) => {
  for (let i = 0; i < input.length; i++) {
    const it = sequence(i + 1)

    let value = 0
    for (let j = i; j < input.length; j++) {
      value += (input[j] * it.next().value)
    }

    input[i] = Math.abs(value) % 10
  }

  return input
}

const part_one = () => {
  let phase = INPUT.split('').map(v => parseInt(v, 10))

  for (let i = 0; i < 100; i++) {
    phase = fft(phase)
  }

  console.log('After 100 phases of FFT, what are the first eight digits in the final output list?', phase.slice(0, 8).join(''))
}

const repeat = (arr: any[], count: number) => {
  const res = Array(arr.length * count)
  for (let i = 0; i < res.length; i++) {
    res[i] = arr[i % arr.length]
  }
  return res
}

// Noticed that the phase pattern devolves
// into only zeros and ones after a number
// of iterations, but missed that this was
// happening when i is larger than N/2 and
// that the offset is after this point. ;(
const fft2 = (input: number[]) => {
  let sum = input.reduce((prev, next) => prev + next, 0)
  for (let i = 0; i < input.length; i++) {
    const tmp = input[i]
    input[i] = sum % 10
    sum -= tmp
  }

  return input
}

const part_two = () => {
  const input = INPUT.split('').map(v => parseInt(v, 10))
  const offset = parseInt(input.slice(0, 7).join(''), 10)

  let phase = repeat(input, 10000).slice(offset)

  for (let i = 0; i < 100; i++) {
    phase = fft2(phase)
  }

  console.log('After repeating your input signal 10000 times and running 100 phases of FFT, what is the eight-digit message embedded in the final output list?', phase.slice(0, 8).join(''))
}

export {
  part_one,
  part_two
}
