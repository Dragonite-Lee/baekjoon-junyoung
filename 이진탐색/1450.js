/**
 * 1450 냅색문제
 * 문제설명
 * N개의 물건이 있고, 최대 C만큼의 무게를 넣을 수 있는 가방이 있다.
 * N개의 물건을 가방에 넣는 방법의 수를 구해라
 * 아이디어
 * sum_arr만들고 이진탐색으로 최대무게 아래갯수 구하기
 */

const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, C] = input.split(' ').map(Number);

const weight = arr[0].split(' ').map(Number);
const weight_length = weight.length;
const arr1 = weight.slice(0, weight_length / 2);
// console.log('arr1: ', arr1);
const arr2 = weight.slice(weight_length / 2);
// console.log('arr2: ', arr2);
const sum_arr1 = [];
const sum_arr2 = [];
for (let i = 1; i < (1 << arr1.length) + 1; i++) {
  let cnt = 0;
  for (let j = 1; j < arr1.length + 1; j++) {
    if (i & (1 << (j - 1))) {
      cnt += arr1[j - 1];
    }
  }

  sum_arr1.push(cnt);
}
for (let i = 1; i < (1 << arr2.length) + 1; i++) {
  let cnt = 0;
  for (let j = 1; j < arr2.length + 1; j++) {
    if (i & (1 << (j - 1))) {
      cnt += arr2[j - 1];
    }
  }

  sum_arr2.push(cnt);
}

sum_arr1.sort((a, b) => a - b);
let result = 0;
for (item of sum_arr2) {
  if (item > C) {
    continue;
  }
  let left = 0;
  let right = sum_arr1.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sum_arr1[mid] + item > C) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  result += right + 1;
}
console.log(result);

// console.log(right + 1);
// 00
// 01
// 10
// 11
// // 2 2
// // 1 1

// // 4

// 0 1 1 2
