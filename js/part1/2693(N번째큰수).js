/*
1. 문제설명
- 배열 A가 주어질 때 N번째 큰 값
- 배열 크기는 항상 10이고, 자연수만 가지고, N은 항상 3
2. 아이디어
-
3. 시간복잡도

*/

const fs = require('fs');
const [N, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');


for (let i = 0; i < N; i++) {
  var list = arr[i].split(' ');
  list.sort((a, b) => Number(b) - Number(a));
  console.log(list[2])
}

