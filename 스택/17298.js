/**
 * 문제설명
 * 크기가 N인 수열 A = A1 A2 ... AN이 있다.
 * 수열의 각 원소에 대해서 오큰수 NGE(i)를 구하려고 한다.
 * 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수를 의미하며,
 * 그러한 수가 없으면 오큰수는 -1이다.
 * 3527이면 NGE(1)이면 5임
 * NGE1부터 N까지 구하기
 * 아이디어
 * N은 1,000,000 ...
 * 이중포문은 불가
 * stack 이용 -> 스택이 존재하고 조건에 맞으면 스택을 이용해 행동하고 빼버림
 * 시간복잡도
 * NlogN
 */

const fs = require("fs");
const [input, arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);
const num_arr = arr.split(" ").map(Number);

const stack = [0];
// 이중포문 방법 --> 시간초과
// for (let i = 0; i < N; i++) {
//   let find = false;
//   for (let j = i + 1; j < N; j++) {
//     if (num_arr[i] < num_arr[j]) {
//       find = true;
//       stack.push(num_arr[j]);
//       break;
//     }
//   }
//   if (!find) {
//     stack.push(-1);
//   }
// }
const NGE = Array(N).fill(-1);

for (let i = 1; i < N; i++) {

  while (stack && num_arr[i] > num_arr[stack[stack.length - 1]]) {
    NGE[stack.pop()] = num_arr[i];
  }
  stack.push(i);
}
// console.log(stack);
console.log(...NGE);
// 3 5 2 7
// stack 0
// A1과 > Astack-1과 비교
// answer[stack]엔 a1
// stack 1
// A2과 > Astack-1과 비교
// stack 1,2
// A3과 > Astack-1과 비교
// answner
// 8
// 7 2 9 8 1 3 4 3
