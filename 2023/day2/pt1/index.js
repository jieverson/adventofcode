const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')

const red = 12
const green = 13
const blue = 14

const lines = input.split('\n').map((line) => {
    const aux = line.split(':')
    const game = parseInt(aux[0].split(' ')[1])
    let sets = aux[1].split(';')
    sets = sets.map((set) => {
        const colors = set.split(',')
        return colors.map((color) => {
            color = color.trim()
            const value = parseInt(color.split(' ')[0])
            
            if(color.includes('red')){
                if(value <= red)
                    return true
            }
            else if(color.includes('green')){
                if(value <= green)
                    return true
            }
            else if(color.includes('blue')){
                if(value <= blue)
                    return true
            }
            return false
        }).every(x => x)
    })
    console.log(game, sets, sets.every(x => x))
    if(sets.every(x => x))
        return game
    else 
        return 0
})

const result = lines.reduce((acc, curr) => acc + curr, 0)

console.log(result)