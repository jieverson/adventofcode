const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')
numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9']
numbersTx = [['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'], ['five', '5'], ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9']]

const result = input.split('\n').map(l => {
    let a = numbers.map(n => ({
        text: n,
        at: l.indexOf(n)
    })).filter(x => x.at >= 0).sort((a, b) => a.at - b.at)

    let r = numbers.map(n => ({
        text: n,
        at: l.lastIndexOf(n)
    })).filter(x => x.at >= 0).sort((a, b) => a.at - b.at)

    let b = a[0].text + r[r.length - 1].text
    numbersTx.forEach(x => {
      b = b.replace(x[0], x[1]).replace(x[0], x[1])
    })

    console.log(b + ' = ' + l)

    return parseInt(b)
}).reduce((a, b) => a + b, 0)

console.log(result)