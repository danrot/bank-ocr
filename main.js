const fs = require('fs');
const input = fs.readFileSync('./file', 'utf8');

const numberWidth = 3;
const numberHeight = 3;
const lineWidth = 27;

const numberMap = [
    [' _ ', '| |', '|_|'].join(''),
    ['   ', '  |', '  |'].join(''),
    [' _ ', ' _|', '|_ '].join(''),
    [' _ ', ' _|', ' _|'].join(''),
    ['   ', '|_|', '  |'].join(''),
    [' _ ', '|_ ', ' _|'].join(''),
    [' _ ', '|_ ', '|_|'].join(''),
    [' _ ', '  |', '  |'].join(''),
    [' _ ', '|_|', '|_|'].join(''),
    [' _ ', '|_|', ' _|'].join(''),
];


const output = input.split('\n')
    .slice(0, -1)
    .reduce(function(accumulator, line) {
        const currentIndex = accumulator.length - 1;
        if (accumulator[currentIndex].length % 4 === 3) {
            accumulator.push([]);
            return accumulator;
        }

        accumulator[currentIndex].push(line);

        return accumulator;
    }, [[]])
    .map(function(number) {
        return number.map(function(numberLine) {
            // 3 is number width
            return numberLine.match(/.{1,3}/g);
        });
    })
    .map(function(numberLines) {
        return Array(lineWidth / numberWidth)
            .fill(undefined)
            .map(function(value, index) {
                return numberLines.map(function(numberLine) {
                    if (numberLine === null) {
                        return '   ';
                    }
                    return numberLine[index];
                }).join('');
            });
    })
    .map(function(numberLines) {
        return numberLines.map(function(number) {
            return numberMap.findIndex((value) => value === number);
        }).join('');
    })
    .map(function(number) {
        return {
            number,
            checksum: number.split('')
                .map(function(digit, index) {
                    return parseInt(digit) * (number.length - index);
                })
                .reduce(function(sum, value) {
                    return sum + value;
                }) % 11 === 0,
        };
    });

console.log(output);
