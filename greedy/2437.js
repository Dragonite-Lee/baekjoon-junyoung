/**
 * 문제설명
 * 하나의 양팔 저울을 이용해 무게를 측정
 * N개의 저울추 중 추들을 사용해 측정할 수 없는 양의 정수 무게 중 최솟값
 * 아이디어
 * N은 1000이하
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const N = input[0];

arr.sort((a, b) => a - b);
// console.log(arr);
let target = 1;

for (num of arr) {
  if (target < num) {
    break
  }
  target += num;
}
console.log(target)