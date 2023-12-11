const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const result = input.split('\n').map(line => {
    const aux = line.split(':')
    const card = parseInt(aux[0].split(' ')[1].trim())
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
        value = Math.pow(2, value - 1)
    }

    console.log(card, data, value)

    return value
}).reduce((a, b) => a + b, 0)

console.log(result)