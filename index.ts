if (process.argv.length < 3) throw new Error('Missing day')

const { part_one, part_two } = require(`./days/${process.argv[2]}`)

part_one()
part_two()

export default {}
