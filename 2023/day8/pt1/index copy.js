const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8').split('\n\n')

const instructions = input[0].split('')
console.log(instructions)

const map = new Map()
input[1].split('\n').forEach(l => {
    const aux = l.split(' = ')
    const label = aux[0]
    const to = aux[1].replace(/\(|\)/g, '').split(', ')
    map.set(label, { L: to[0], R: to[1] })
})
console.log(map)

let currentIndex = 0
function next() {
    const current = instructions[currentIndex]
    currentIndex++
    if(currentIndex >= instructions.length) {
        currentIndex = 0
    }
    return current
}

const keys = Array.from(map.keys())

const current = keys[0]
const end = keys[keys.length - 1]


// **** new *****
//path: LL
//instructions: R
//current: AAA
function walk(previous, current, instruction, path) {
    const place = map.get(current)
    const step = place[instruction]

    //place[path + instruction] = step
    //console.log(map)

    if(previous){
        const before = map.get(previous)
        before[path + instruction] = step
    }

    console.log(current, instruction, step)
    if(step === end) {
        return 1
    }
    
    return 1 + walk(current, step, next(), path + instruction)
}


const result = walk(null, current, next(), "")


// ***** work ****
// let place = current
// let result = 0
// while(place !== end) {
//     const instruction = next()
//     place = map.get(place)[instruction]
//     result++
//     console.log(place, result)
// }
// ***** work ****

console.log(result)