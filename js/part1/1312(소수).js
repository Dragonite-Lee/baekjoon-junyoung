const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split(' ');
var result = 0
for (let i = 0; i < Number(input[2]); i++) {
  input[0] = Number(input[0]) % Number(input[1]) * 10
  result = Math.floor(input[0] / Number(input[1]))
}
console.log(result)