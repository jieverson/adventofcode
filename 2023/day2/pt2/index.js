const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const lines = input.split('\n').map((line) => {
    const aux = line.split(':')
    const game = parseInt(aux[0].split(' ')[1])

    const re = /(\d+)(\sred)/g
    const redMatches = aux[1].match(re).map(x => parseInt(x.split(' ')[0]))
    const red = Math.max(...redMatches)

    const ge = /(\d+)(\sgreen)/g
    const greenMatches = aux[1].match(ge).map(x => parseInt(x.split(' ')[0]))
    const green = Math.max(...greenMatches)

    const be = /(\d+)(\sblue)/g
    const blueMatches = aux[1].match(be).map(x => parseInt(x.split(' ')[0]))
    const blue = Math.max(...blueMatches)

    const power = red * green * blue

    console.log(game, line, red, green, blue, power)
    
    return power
})

const result = lines.reduce((acc, curr) => acc + curr, 0)

console.log(result)