/*
1. 문제설명
- N개의 정수 주어짐 최대 최소 구하기
- 첫째 줄에 1,000,000 갯수로 줄어짐 공백 구분해서 줌
- 최소 최대 로 출력
2. 아이디어
- 배열로 만들고, 첫 값을 최소 최대에 넣고 한번 순회하면서 작거나 크면 바꿈
3. 시간복잡도
- for문 1번 1,000,000 백만이라 가능
*/

const fs = require('fs');
const [N, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const list = arr[0].split(' ');
const sorted_list = list.sort((a,b) => a - b)
// console.log('sorted_list: ', sorted_list);
console.log(sorted_list[0], sorted_list[N-1])
// var min = Number(list[0]);
// var max = Number(list[1]);

// for (let i = 0; i < Number(N); i++) {
//   if (Number(list[i]) > max) {
//     max = Number(list[i]);
//   }
//   if (Number(list[i]) < min) {
//     min = Number(list[i]);
//   }
// }
// console.log(min, max);
