const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')
const result = input.split('\n').map(l => {
    const line = l.split('')
    return parseInt(
        line[line.findIndex(c => Number.isInteger(parseInt(c)))]
        + line[line.reverse().findIndex(c => Number.isInteger(parseInt(c)))]
    )
}).reduce((a, b) => a + b, 0)

console.log(result)