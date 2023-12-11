const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')

let copies = {}
const result = input.split('\n').map(line => {
    const aux = line.split(':')
    const a = aux[0].split(' ')
    const card = parseInt(a[a.length - 1].trim())
    const numbers = aux[1].split('|')
    const winning = numbers[0].trim().split(' ').filter(x => x).map(x => parseInt(x)).sort((a, b) => a - b)
    const have = numbers[1].trim().split(' ').filter(x => x).map(x => parseInt(x)).sort((a, b) => a - b)

    let data = {}
    winning.forEach(x => data[x] = true)

    let value = 0
    have.forEach(x => {
        if(data[x]) value++
    })

    if(value > 0){
        for(let i = 0; i < value; i++){
            const index = card + i + 1
            const increment = copies[card] ? copies[card] + 1 : 1
            if(copies[index])copies[index] += increment
            else copies[index] = increment
        }
    }

    return (copies[card] ? copies[card] : 0) + 1
}).reduce((a, b) => a + b, 0)

console.log(copies)

console.log(result)