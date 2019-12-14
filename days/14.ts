const INPUT = `1 JNDQ, 11 PHNC => 7 LBJSB
1 BFKR => 9 VGJG
11 VLXQL => 5 KSLFD
117 ORE => 6 DMSLX
2 VGJG, 23 MHQGW => 6 HLVR
2 QBJLJ => 6 DBJZ
1 CZDM, 21 ZVPJT, 1 HLVR => 5 VHGQP
1 RVKX => 1 FKMQD
38 PHNC, 10 MHQGW => 5 GMVJX
4 CZDM, 26 ZVHX => 7 QBGQB
5 LBJSB, 2 DFZRS => 4 QBJLJ
4 TJXZM, 11 DWXW, 14 VHGQP => 9 ZBHXN
20 VHGQP => 8 SLXQ
1 VQKM => 9 BDZBN
115 ORE => 4 BFKR
1 VGJG, 1 SCSXF => 5 PHNC
10 NXZXH, 7 ZFXP, 7 ZCBM, 7 MHNLM, 1 BDKZM, 3 VQKM => 5 RMZS
147 ORE => 2 WHRD
16 CQMKW, 8 BNJK => 5 MHNLM
1 HLVR => 5 TJQDC
9 GSLTP, 15 PHNC => 5 SFZTF
2 MJCD, 2 RVKX, 4 TJXZM => 1 MTJSD
1 DBJZ, 3 SLXQ, 1 GMSB => 9 MGXS
1 WZFK => 8 XCMX
1 DFZRS => 9 GSLTP
17 PWGXR => 2 DFZRS
4 BFKR => 7 JNDQ
2 VKHN, 1 SFZTF, 2 PWGXR => 4 JDBS
2 ZVPJT, 1 PHNC => 6 VQKM
18 GMSB, 2 MGXS, 5 CQMKW => 3 XGPXN
4 JWCH => 3 BNJK
1 BFKR => 2 PWGXR
12 PHNC => 2 GMSB
5 XGPXN, 3 VQKM, 4 QBJLJ => 9 GXJBW
4 MHQGW => 9 DWXW
1 GMSB, 1 BFKR => 5 DBKC
1 VLXQL, 10 KSLFD, 3 JWCH, 7 DBKC, 1 MTJSD, 2 WZFK => 9 GMZB
4 JDBS => 8 BRNWZ
2 ZBHXN => 7 HMNRT
4 LBJSB => 7 BCXGX
4 MTJSD, 1 SFZTF => 8 ZCBM
12 BRNWZ, 4 TJXZM, 1 ZBHXN => 7 WZFK
10 HLVR, 5 LBJSB, 1 VKHN => 9 TJXZM
10 BRNWZ, 1 MTJSD => 6 CMKW
7 ZWHT => 7 VKHN
5 CQMKW, 2 DBKC => 6 ZFXP
1 CMKW, 5 JNDQ, 12 FKMQD, 72 BXZP, 28 GMVJX, 15 BDZBN, 8 GMZB, 8 RMZS, 9 QRPQB, 7 ZVHX => 1 FUEL
10 MGXS => 9 JWCH
1 BFKR => 8 SCSXF
4 SFZTF, 13 CZDM => 3 RVKX
1 JDBS, 1 SFZTF => 9 TSWV
2 GMVJX, 1 PHNC => 1 CZDM
6 JDBS => 1 BXZP
9 TSWV, 5 TJXZM => 8 NXZXH
1 HMNRT, 5 TSWV => 4 VLXQL
16 WZFK, 11 XCMX, 1 GXJBW, 16 NXZXH, 1 QBGQB, 1 ZCBM, 10 JWCH => 3 QRPQB
12 SCSXF, 6 VGJG => 4 ZVPJT
10 JNDQ => 3 ZWHT
1 DBJZ, 9 BCXGX => 2 CQMKW
1 WHRD, 14 DMSLX => 8 MHQGW
3 VKHN, 8 TJQDC => 4 MJCD
1 QBJLJ => 4 ZVHX
1 MHQGW, 4 ZVHX => 3 BDKZM`

const BATCH_COST: Record<string, number> = {}
const BATCH_SIZE: Record<string, number> = {}
const PARENTS: Record<string, string[]> = {}
const CHILDREN: Record<string, string[]> = {}

INPUT.split('\n').forEach(line => {
  const match = line.match(/(\d+\s\w+)/g)

  if (!match) return

  const [child, parents] = [match.pop(), match]

  if (!child) return

  const [child_cost, child_id] = child.split(' ')

  for (const parent of parents) {
    const [parent_cost, parent_id] = parent.split(' ')
    BATCH_COST[`${parent_id}_${child_id}`] = parseInt(parent_cost, 10)
    BATCH_SIZE[child_id] = parseInt(child_cost, 10)
    CHILDREN[parent_id] = [...(CHILDREN[parent_id] || []), child_id]
    PARENTS[child_id] = [...(PARENTS[child_id] || []), parent_id]
  }
})

const topological_sort = (parents: Record<string, string[]>, children: Record<string, string[]>, start = 'ORE') => {
  const in_degrees = Object.keys(parents).reduce<Record<string, number>>((obj, key) => {
    obj[key] = parents[key].length
    return obj
  }, {})

  const queue = [start]
  const sorted = []

  while (queue.length) {
    const current = queue.shift()

    if (!current) continue

    sorted.push(current)

    if (!children[current]) continue

    for (const child of children[current]) {
      in_degrees[child] -= 1
      if (in_degrees[child] === 0) queue.push(child)
    }
  }

  return sorted
}

const calculate_ore = (whole_batch = true) => {
  const batches: Record<string, number> = {}
  for (const n of topological_sort(PARENTS, CHILDREN).reverse().slice(1, -1)) {
    batches[n] = 0
    for (const c of CHILDREN[n]) {
      batches[n] += (BATCH_COST[`${n}_${c}`] * (batches[c] || 1)) / BATCH_SIZE[n]
    }
    if (whole_batch) batches[n] = Math.ceil(batches[n])
  }

  const ore = Object.keys(batches).reduce((prev, key) => {
    if (!BATCH_COST[`ORE_${key}`]) return prev
    return prev + (BATCH_COST[`ORE_${key}`] * batches[key])
  }, 0)

  return ore
}

const part_one = () => {
  console.log('Given the list of reactions in your puzzle input, what is the minimum amount of ORE required to produce exactly 1 FUEL?', calculate_ore())
}

const part_two = () => {
  console.log('Given 1 trillion ORE, what is the maximum amount of FUEL you can produce?', Math.floor(1000000000000 / calculate_ore(false)))
}

export {
  part_one,
  part_two
}
