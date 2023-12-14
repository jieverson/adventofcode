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
//console.log(map)

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

for(let a = 0; a < 12; a++) {
    for(let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const place = map.get(key)

        const known = Object.keys(place)

        if(key === end)
            break
    
        for(let j = 0; j < known.length; j++) {
            const direction = known[j]
            
            let tryL = direction + 'L'
            let tryR = direction + 'R'
    
            if(place[direction] === end)
                continue

            place[tryL] = map.get(place[direction]).L
            place[tryR] = map.get(place[direction]).R
        }
    }
}

//console.log(map)

let place = current
let result = 0
while(place !== end) {
    const future = seeFuture(13)
    //console.log(future)

    const path = Object.keys(map.get(place)).sort(( a, b ) => b.length - a.length).find(k => future.startsWith(k))
    //console.log(path)

    place = map.get(place)[path]
    currentIndex += path.length
    if(currentIndex >= instructions.length) {
        currentIndex = currentIndex - instructions.length
    }
    result += path.length


    // don't print every result... skip by million
    if(result % 10000 === 0)
        console.log(place, result)
    //const instruction = next()
    //place = map.get(place)[instruction]
    //result++
    //console.log(place, result)
}

console.log(result)

/*
let place = current
let result = 0
while(place !== end) {

    if(map.get(place)[seeFuture(2)] === end){
        console.log('see future 2')
        result += 2
        break;
    }
    if(map.get(place)[seeFuture(3)] === end){
        console.log('see future 3')
        result += 3
        break;
    }
    if(map.get(place)[seeFuture(4)] === end){
        console.log('see future 4')
        result += 4
        break;
    }
    if(map.get(place)[seeFuture(5)] === end){
        console.log('see future 5')
        result += 5
        break;
    }
    if(map.get(place)[seeFuture(6)] === end){
        console.log('see future 6')
        result += 6
        break;
    }
    if(map.get(place)[seeFuture(7)] === end){
        console.log('see future 7')
        result += 7
        break;
    }
    if(map.get(place)[seeFuture(8)] === end){
        console.log('see future 8')
        result += 8
        break;
    }
    if(map.get(place)[seeFuture(9)] === end){
        console.log('see future 9')
        result += 9
        break;
    }
    if(map.get(place)[seeFuture(10)] === end){
        console.log('see future 10')
        result += 10
        break;
    }
    if(map.get(place)[seeFuture(11)] === end){
        console.log('see future 11')
        result += 11
        break;
    }
    if(map.get(place)[seeFuture(12)] === end){
        console.log('see future 12')
        result += 12
        break;
    }
    
    const instruction = next()
    place = map.get(place)[instruction]
    result++
    console.log(place, result)
}

console.log(result)
*/