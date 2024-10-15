/*
1. 문제설명
- 10개의 기차역 순서대로 사람이 타고 내림 가장 많은 사람이 있던 순간은?
2. 아이디어
- 10번 순회
3. 시간복잡도
-for문 1번
 */

const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split('\n');
// console.log('input: ', input);
var now = 0;
var max = 0;
for (let i = 0; i < 10; i++) {
  const [x, y] = input[i].split(' ');
  now += y - x;

  if (now > max) {
    max = now;
  }
}
console.log(max);
