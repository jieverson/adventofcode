const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')
const matrix = input.split('\n').map(row => row.split(''))
const width = matrix[0].length
const height = matrix.length

const newMatrix = Array(height).fill().map(() => Array(width).fill('.'))

function fillNumber(x, y) {
    if(x < 0 || x >= width || y < 0 || y >= height) return ''
    if(matrix[y][x] === '.') return ''
    if(newMatrix[y][x] !== '.') return ''

    if(/\d/.test(matrix[y][x])){
        let n = matrix[y][x]
        newMatrix[y][x] = n
        matrix[y][x] = '.'
        const before = fillNumber(x - 1, y)
        const after = fillNumber(x + 1, y)
        return before + n + after
    }
}

let result = 0
for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
        if(matrix[y][x] !== '*') continue
        
        newMatrix[y][x] = matrix[y][x]

        const neighbours = [
            [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
            [x - 1, y],                 [x + 1, y],
            [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
        ]

        const neighboursNumbers = neighbours.map(([x, y]) => {
            const number = fillNumber(x, y)
            if(number) {
                return parseInt(number)
            }
            else {
                return 0
            }
        }).filter(x => x !== 0)

        if(neighboursNumbers.length === 2) {
            result += neighboursNumbers[0] * neighboursNumbers[1]
        }
    }
}

console.log(newMatrix.map(row => row.join('')).join('\n'))

console.log(result)