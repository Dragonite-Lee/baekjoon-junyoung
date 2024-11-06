/**
 * 문제설명
 * 산성과 알칼리 용액이 있음
 * 서로다른 두 용액을 섞어서 0에 가장 가까운 용액으로 만들자.
 * 아이디어
 * 투포인터로 양쪽 끝부터 합을 계산하며 이동
 * 시간복잡도
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
let left = 0;
let right = N - 1;
var final = [arr[left], arr[right]];
let result = Math.abs(arr[left] + arr[right]);
// console.log('result: ', result);
while (left < right) {
  let sum = arr[left] + arr[right];

  if (result > Math.abs(sum)) {
    result = Math.abs(sum);
    final[0] = arr[left];
    final[1] = arr[right];
    if (result === 0) {
      break;
    }
  }
  if (sum < 0) {
    left += 1;
  } else {
    right -= 1;
  }
}
console.log(...final);
