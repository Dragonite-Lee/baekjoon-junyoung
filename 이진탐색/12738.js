/**
 * 12738 가장 긴 증가하는 부분 수열3
 * 문제설명
 * 수열 A가 주어졌을 때. 가장 긴 증가하는 부분 수열을 구해라
 * A = {10, 20, 10, 30, 20, 50} 가 주어지면 10 20 30 50 이고 길이는 4가 된다.
 * 아이디어
 * N은 1부터 1,000,000
 * 이진탐색은 LogN
 * 시간복잡도
 * for문 내부에 이진탐색 NlogN
 */
const fs = require("fs");
const [input, arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);
const num_arr = arr.split(" ").map(Number);
// console.log('num_arr: ', num_arr);
// 10 30 10 20 30 40 50
const memo = [-1000000001];
function search(start, end, target) {
  if (start === end) {
    memo[start] = target;
    return;
  }
  const mid = Math.floor((start + end) / 2);
  if (memo[mid] >= target) {
    search(start, mid, target);
  } else {
    search(mid + 1, end, target);
  }
}

for (item of num_arr) {
  if (memo[memo.length - 1] < item) {
    memo.push(item);
  } else {
    search(0, memo.length - 1, item);
  }
}

console.log(memo.length - 1);