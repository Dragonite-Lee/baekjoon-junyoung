/**
 * 2143 이진탐색 두 배열의 합
 * 문제설명
 * 한배열 1부터 n까지 중
 * 부 배열은 i 부터 j 까지임 1<= i <= j <= n
 * 각 부배열의 합이 T가되는 모든 쌍을 찾아라
 * 없으면 0출력
 * 아이디어
 * 각각 1,000개까지 존재
 * 누적합어레이 만들고 정렬한 다음 a를 기준으로 for문 돌면서 b값을 이진탐색으로 찾음
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const T = Number(input);
// console.log(T);
const A_length = Number(arr[0]);
const B_length = Number(arr[2]);
const A_arr = arr[1].split(' ').map(Number);
const B_arr = arr[3].split(' ').map(Number);

const a_sum_arr = [];
const b_sum_arr = [];
let result = 0;

for (let i = 0; i < A_length; i++) {
  for (let j = i + 1; j < A_length + 1; j++) {
    a_sum_arr.push(A_arr.slice(i, j).reduce((acc, cur) => acc + cur, 0));
  }
}
for (let i = 0; i < B_length; i++) {
  for (let j = i + 1; j < B_length + 1; j++) {
    b_sum_arr.push(B_arr.slice(i, j).reduce((acc, cur) => acc + cur, 0));
  }
}

a_sum_arr.sort((a, b) => a - b);
b_sum_arr.sort((a, b) => a - b);

function lowerBound(arr, target) {
  // lower는 처음 성립하는 걸 찾음 >= 이용
  let st = 0,
    en = arr.length;
  while (st < en) {
    let mid = Math.floor((st + en) / 2);
    if (arr[mid] >= target) en = mid;
    else st = mid + 1;
  }
  return st;
}

function upperBound(arr, target) {
  // upper은 target보다 하나 큰애 찾음
  let st = 0,
    en = arr.length;
  while (st < en) {
    let mid = Math.floor((st + en) / 2);
    if (arr[mid] > target) en = mid;
    else st = mid + 1;
  }
  return st;
}

for (item of a_sum_arr) {
  let last = T - item;
  let upper = upperBound(b_sum_arr, last);
  let lower = lowerBound(b_sum_arr, last);
  result += upper - lower;
}
console.log(result);