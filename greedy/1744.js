/**
 * 문제 설명
 * 길이가 N인 수열이 주어짐 수열의 합을 구하려고 하는데
 * 모두 더해서 구하는게 아니라, 두 수를 묶으려함
 * 위치에 상관없이 가능하지만, 자기자신을 묶는 것은 불가
 * 묶은 수는 서로 곱해서 더하게 됨
 * 한번만 묶거나 묶지말아야함
 * 최대합
 * 아이디어
 * 정렬 후 앞에서부터 묶어서 더하기 시작
 * 묶어서 가다가 수가 1이면 묶지 않고 그냥 더함
 * 수가 0과 음수가 나와도 묶지 않고 지나감
 * 근데 두 수가 0과-1이면 곱해서 더하는게 좋음
 *
 * 정리
 * 해당 수가 1이 아니면 배열에 넣기 1이면 1을 그냥 넣기
 * 현재 수가 0인데 음수를 만나면 곱해서 넣기
 * 음수가 음수를 만날경우  묶으면 양수
 * 시간복잡도
 * 정렬 logN + N
 */
const fs = require('fs');

const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
const N = input;
// console.log('N: ', N);
const plus_arr = [];
const minus_arr = [];
let zero_arr = [];
let sum_arr = [];
for (item of arr) {
  if (item > 1) {
    plus_arr.push(item);
  } else if (item < 0) {
    minus_arr.push(item);
  } else if (item === 1) {
    sum_arr.push(item);
  } else {
    zero_arr.push(item);
  }
}
// console.log(zero_arr);
plus_arr.sort((a, b) => b - a);
minus_arr.sort((a, b) => a - b);

let current = -1001;
for (item of plus_arr) {
  if (current === -1001) {
    current = item;
  } else {
    sum_arr.push(current * item);
    current = -1001;
  }
}
if (current !== -1001) {
  sum_arr.push(current);
}
current = -1001;
for (item of minus_arr) {
  if (current === -1001) {
    current = item;
  } else {
    sum_arr.push(current * item);
    current = -1001;
  }
}
// console.log(current, zero_arr.length);
if (current !== -1001) {
  if (zero_arr.length === 0) {
    sum_arr.push(current);
  }
}

// console.log(sum_arr);
let result = sum_arr.reduce((acc, cur) => {
  return acc + cur;
}, 0);
console.log(result);
