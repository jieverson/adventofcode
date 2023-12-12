const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const lines = input.split('\n\n')
console.log(lines)

const seeds = lines[0].split(':')[1].trim().split(' ').map(Number).sort((a, b) => a - b)
lines.shift()

const cpu = lines.map(line => {
    const aux = line.split('\n')
    aux.shift()

    const maps = aux.map(a => {
        const [destination, source, steps] = a.split(' ').map(Number)
        return { destination, source, steps }
    })

    const f = function(source){
        for(let i in maps){
            const map = maps[i]
            if(source >= map.source && source < map.source + map.steps){
                const diff = source - map.source
                return map.destination + diff
            }
        }
        return source
    }

    return f
})

const result = seeds.map(seed => cpu.reduce((acc, f) => f(acc), seed)).sort((a, b) => a - b)[0]

console.log(result)