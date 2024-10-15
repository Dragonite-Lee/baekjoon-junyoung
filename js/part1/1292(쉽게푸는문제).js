/*
1. 문제설명
- 1 22 333 4444 같은 배열이 있다
- 2개의 수가 주어지면 그 수 포함 사이 수 합 구하기
2. 아이디어
-
3. 시간복잡도

*/

const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split(' ');

var arr = [];
var cnt = 0;
for (let i = 1; i < Number(input[1]) + 1; i++) {
  for (let j = 1; j < i + 1; j++) {
    cnt += 1;
    arr.push(i);
  }
  if (cnt > Number(input[1])) {
    break;
  }
}

const result = arr.reduce((total, now, index) => {
  if (index >= Number(input[0]) - 1 && index <= Number(input[1]) - 1) {
    total += now;
  }
  return total;
}, 0);

console.log(result);
// 1 22 333 4444 라는 수열??
// 1 2 2
