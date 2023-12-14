const fs = require('node:fs')

const input = fs.readFileSync('./sample.txt', 'utf8').split('\n\n')

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

function seeFuture(size){
    let future = ""
    let auxIndex = currentIndex
    for(let i = 0; i < size; i++) {
        if(auxIndex >= instructions.length) {
            auxIndex = 0
        }
        future += instructions[auxIndex]
        auxIndex++
    }
    return future
}

const keys = Array.from(map.keys())

const current = keys[0]
const end = keys[keys.length - 1]

// for(let i = 0; i < keys.length; i++) {
//     const key = keys[i]
//     const place = map.get(key)
//     const known = Object.keys(place)

//     for(let j = 0; j < known.length; j++) {
//         const direction = known[j]
        
//         let tryL = direction + 'L'
//         let tryR = direction + 'R'

//         place[tryL] = map.get(place[direction]).L
//         place[tryR] = map.get(place[direction]).R
//     }
// }
// console.log(map)

let place = current
let result = 0
while(place !== end) {
    let instruction = next()

    console.log(place, instruction)
    if(Object.keys(map.get(place)).length > 2) {
        if(map.get(place)[instruction + instructions[currentIndex + 1]]) {
            instruction += next()
            console.log(place, instruction)


            while(map.get(place)[instruction]) {
                console.log(map.get(place)[instruction])
                instruction += next()
            }
        }
    }

    const oldPlace = place

    place = map.get(place)[instruction]
    result += instruction.length

    if(instruction.length > 1) {
        delete map.get(oldPlace)[instruction]
        console.log(oldPlace, instruction, place, result)
        console.log(map)
        console.log('deleted: ' + instruction)
        
    }

    map.get(oldPlace)[instruction + 'L'] = map.get(place).L
    map.get(oldPlace)[instruction + 'R'] = map.get(place).R

    //map.delete(instruction)
    //map.set(instruction + 'L', map.get(place).L)
    //map.set(instruction + 'R', map.get(place).R)

    console.log(oldPlace, instruction, place, result)
    console.log(map)
    //console.log(place, result)
}

console.log(map)

console.log(result)