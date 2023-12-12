const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const lines = input.split('\n\n')
console.log(lines)

//const seedsArray = new Int32Array(4294967295)
const seedsDictionary = {}

const seedInput = lines[0].split(':')[1].trim().split(' ').map(Number)
for(let j = 0; j < seedInput.length; j += 2){
    for(let i = 0; i < seedInput[j + 1]; i++){
        const seed = seedInput[j] + i
        seedsDictionary[seed] = seed
        //seedsArray[seed] = seed
    }
}

//console.log(seedsArray)

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

const result = Math.min(...Object.values(seedsDictionary).map(seed => cpu.reduce((acc, f) => f(acc), seed)))

console.log(result)



// let min = Number.MAX_VALUE
// let currentPercentage = 0
// for(let i = 0; i < seedsArray.length; i++) {
//     const seed = seedsArray[i]
//     if(seed === 0) 
//         continue

//     if(i % 1000000 === 0){
//         const percentage = Math.floor((i / seedsArray.length) * 1000) / 10
//         if(percentage > currentPercentage){
//             currentPercentage = percentage
//             console.log(currentPercentage + '%')
//         }
//     }
//     const result = cpu.reduce((acc, f) => f(acc), seed)
//     if(result < min){
//         min = result
//         const percentage = (i / seedsArray.length) * 100
//         console.log(min, seed, percentage)
//     }
// }

//console.log(min)