/**
 * 2230 수고르기 투포인터
 * 문제설명
 * N개의 정수로 이루어진 수열이 존재 A1 ~ AN
 * 이 수열에서 두 수를 골랐을 때 (같은 수일 수도 잇음) 그 차이가 M이상이면서 제일 작은 경우를 구하자
 * 아이디어
 * 1 ≤ N ≤ 100,000
 * 0 ≤ M ≤ 2,000,000,000
 * 이중포문은 안되고 2개를 고르는 수니 투포인터로 접근해보자
 * 작은경우만 구하면되니까 정렬한 뒤
 * left와 right를 같게두고
 * 작으면 right증가해 벌리고
 * 크면 거기서 작은것만 갱신하고 left증가
 * 시간복잡도
 * NlogN
 */

const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.split(" ").map(Number);
const num_arr = [];
for (item of arr) {
  num_arr.push(Number(item));
}
// console.log(num_arr);
num_arr.sort((a, b) => a - b);
// console.log("num_arr: ", num_arr);
let left = 0;
let right = 0;
let result = 2000000000
while (right < N) {
  // console.log("right: ", right);
  // console.log("left: ", left);
  const gap = num_arr[right] - num_arr[left];

  if (gap < M) {
    // gap이 목표치보다 작으면 벌려야함
    right += 1;
  } else if (gap > M) {
    if (gap < result) {
      result = gap;
    }
    left += 1;
  } else {
    result = M;
    break;
  }
}
console.log(result);