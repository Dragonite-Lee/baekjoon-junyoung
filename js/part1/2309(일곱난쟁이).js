/*
1. 문제설명
- 난쟁이가 7이 아니라 9?
- 7명 총 합이 100이 됨
- 9명 키를 받아서 오름차순으로 내뱉기
2. 아이디어
-
3. 시간복잡도

 */

const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split('\n');
var total = input.reduce((total, e) => total + Number(e), 0);
var result = [];
// console.log('total: ', total);
for (let i = 0; i < 9; i++) {
  total -= Number(input[i]);
  for (let j = i + 1; j < 9; j++) {
    if (total - Number(input[j]) === 100) {
      result.push(input[j], input[i])
      break;
    }
  }
  total += Number(input[i]);
  if (result.length === 2) {
    break
  }
}
var a = input.sort((a,b) => Number(a) - Number(b))
for (let i = 0; i < 9; i++) {
  if (a[i] !== result[0] && a[i] !== result[1]) {
    console.log(a[i])
  }
}