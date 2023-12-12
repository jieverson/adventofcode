const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')
console.log(input)

const aux = input.split('\n').map(x => x.split(':')[1].trim())
const time = parseInt(aux[0].split(' ').filter(x => x).join(''))
const distance = parseInt(aux[1].split(' ').filter(x => x).join(''))
let chances = 0

console.log(time)
console.log(distance)

//const maxTime = Math.max(...time)
for(let i = 0; i < time; i++) {
    const c = (time - i) * i
    if(c > distance){
        chances += 1
    }
}

//const result = chances.reduce((acc, cur) => acc * cur, 1)

console.log(chances)
//console.log(result)