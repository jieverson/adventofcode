const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')
console.log(input)

const aux = input.split('\n').map(x => x.split(':')[1].trim())
const time = aux[0].split(' ').filter(x => x).map(x => parseInt(x))
const distance = aux[1].split(' ').filter(x => x).map(x => parseInt(x))
const chances = new Array(time.length).fill(0)

console.log(time)
console.log(distance)

const maxTime = Math.max(...time)
for(let i = 0; i < maxTime; i++) {
    for(let j = 0; j < time.length; j++) {
        const t = time[j]
        const d = distance[j]
        const c = (t - i) * i
        if(c > d){
            chances[j] += 1
        }
    }
}

const result = chances.reduce((acc, cur) => acc * cur, 1)

console.log(chances)
console.log(result)