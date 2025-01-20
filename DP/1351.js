/**
 * 문제설명
 * 무한수열이 존재
 * A0은 1
 * Ai = A[i/P] + A[i/Q] (i >= 1)에서
 * N, P, Q가 주어질 때 AN을 구하는 프로그램 작성
 * 아이디어
 * N값을 넣고 N/P N/Q 각각 가우스 처리 후 dp에 값이 존재하면 return하고 아니면 그 수를 재귀
 * 시간복잡도
 * N이 10^12라 배열로 만들면 안됨
 * 파이썬 dict같은 해쉬구조 이용
 * map으로 필요한 키값만 넣어서 최적화
 */
const fs = require('fs');
const input = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

// console.log(input);
const N = input[0];
const P = input[1];
const Q = input[2];

const dp = new Map();
dp.set(0, 1);

function dfs(num) {
  const front = Math.floor(num / P);
  const back = Math.floor(num / Q);
  if (!dp.has(front)) {
    dfs(front);
  }
  if (!dp.has(back)) {
    dfs(back);
  }

  dp.set(num, dp.get(front) + dp.get(back));
}

if (N === 0) {
  console.log(1);
} else {
  dfs(N);
  console.log(dp.get(N));
}
