/**
 * 문제설명
 * 주어진 번호가 있는 어린이들을 줄세우게하려함
 * 줄서있는 어린이 중 한명을 골라 젤 앞이나 뒤로 보냄
 * 빈자리는 빈자리 뒤에있는 어린이들이 한걸음씩와 메꾼다.
 * 5 2 4 1 3 -> 1 5 2 4 3 -> 1 5 2 3 4 -> 1 2 3 4 5 이런식
 * 앞이나 뒤로 보내는 어린이 수의 최솟값 찾기
 * 아이디어
 * 1,000,000이라 이중포문은 안되니까
 * 연속하는 아이들의 최대수를 냅두기
 * dp[n]= dp[n-1] + 1을 하는 이유는 연속하는 수를 순서대로 찾느라!!
 * 시간복잡도
 * 한번의 반복문이라 O(N)의 시간복잡도
 */

const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);
const graph = arr[0].split(" ").map(Number);

const origin = [];
for (let i = 1; i < N + 1; i++) {
  origin.push(i);
}

const dp = Array(N + 1).fill(0);
for (item of graph) {
  dp[item] = dp[item - 1] + 1;
}
console.log(N - Math.max(...dp));
