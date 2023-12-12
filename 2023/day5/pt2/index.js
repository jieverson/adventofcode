const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const lines = input.split('\n\n')
console.log(lines)

const seedInput = lines[0].split(':')[1].trim().split(' ').map(Number)

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

let min = Number.MAX_VALUE
for(let j = 0; j < seedInput.length; j += 2){
    for(let i = 0; i < seedInput[j + 1]; i++){
        const seed = seedInput[j] + i

        const result = cpu.reduce((acc, f) => f(acc), seed)
        if(result < min){
            min = result
            console.log(min, seed, result)
        }
    }
}
console.log(min)