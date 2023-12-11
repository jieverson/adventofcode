const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')
const matrix = input.split('\n').map(row => row.split(''))
const width = matrix[0].length
const height = matrix.length

const newMatrix = Array(height).fill().map(() => Array(width).fill('.'))

function fillNumber(x, y) {
    if(x < 0 || x >= width || y < 0 || y >= height) return
    if(newMatrix[y][x] !== '.') return

    if(/\d/.test(matrix[y][x])){
        newMatrix[y][x] = matrix[y][x]
        
        fillNumber(x - 1, y)
        fillNumber(x + 1, y)
    }
}

for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
        if(/\d|\./.test(matrix[y][x])) continue

        // only symbles left
        newMatrix[y][x] = matrix[y][x]

        const neighbours = [
            [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
            [x - 1, y],                 [x + 1, y],
            [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
        ]

        neighbours.forEach(([x, y]) => {
            fillNumber(x, y)
        })
    }
}

const output = newMatrix.map(row => row.join('')).join('\n')
console.log(newMatrix.map(row => row.join('')).join('\n'))
const result = output.match(/(\d+)/g)
    .map(x => parseInt(x))
    .reduce((acc, curr) => acc + curr, 0)

console.log(result)