/*
1. 문제설명
- 서로 다른 N개의 자연수의 합이 S
- 자연수 N의 최댓값은?
2. 아이디어
- 1부터 빼면서 cnt 올리고 내가 뺀값을 배열에 넣기
- 만약, 현재 요소가 배열에 있으면 그때 cnt가 정답
 */
const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().split(' ');
var S = Number(input[0]);
// console.log(S)
var cnt = 0;
var index = 1;

while (true) {
  
  S -= index;
  cnt += 1;
  if (S <= index) {
    break;
  }
  index += 1;
  
}
console.log(cnt);
