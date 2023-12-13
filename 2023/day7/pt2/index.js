const fs = require('node:fs')

const input = fs.readFileSync('./input.txt', 'utf8')

console.log(input)

const hands = input.replace(/T/g, 'a')
    .replace(/J/g, '1').replace(/Q/g, 'c')
    .replace(/K/g, 'd').replace(/A/g, 'e')
    .split('\n').map(l => {
        const line = l.split(' ')
        let value = parseInt(line[0], 16)

        let cards = new Int32Array(16)
        let jokers = 0
        line[0].split('').forEach(c => {
            if(c === '1') jokers++
            else cards[parseInt(c, 16)]++
        })
        
        cards = cards.sort((a, b) => b - a)
        
        if(cards[0] + jokers === 5)
            value += 0x60000000
        else if(cards[0] + jokers === 4)
            value += 0x50000000
        else if(cards[0] + jokers === 3 && cards[1] === 2)
            value += 0x40000000
        else if(cards[0] + jokers === 3)
            value += 0x30000000
        else if(cards[0] === 2 && cards[1] === 2)
            value += 0x20000000
        else if(cards[0] + jokers === 2)
            value += 0x10000000
        
        return {
            card: line[0],
            value: value,
            bid: parseInt(line[1])
        }
    })

const result = hands.sort((a, b) => b.value - a.value)
    .reduce((t, c, i) => c.bid * (hands.length - i) + t, 0)

console.log(result)