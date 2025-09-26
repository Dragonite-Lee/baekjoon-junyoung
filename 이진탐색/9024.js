/**
 * 문제설명
 * 여러개의 서로다른 정수 S와 또다른 정수 K개 주어짐
 * S에서 서로다른 두개의 정수의 합이 K에 가장가까운 두 정수의 갯수 구하기
 * 아이디어
 *
 * 시간복잡도
 *
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input);
let index = 0;
while (index < T) {
  const [S, K] = arr[index * 2].split(" ").map(Number);
  const graph = arr[index * 2 + 1].split(" ").map(Number);
  index++;
  graph.sort((a, b) => a - b);
  let result = 0;
  let mini = 1000000000;

  for (let i = 0; i < S; i++) {
    let left = i + 1;
    let right = S - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const sum = graph[mid] + graph[i];
      // console.log("now: ", now);
      if (mini === Math.abs(sum - K)) {
        result += 1;
      } else if (Math.abs(sum - K) < mini) {
        result = 0;
        result += 1;
        mini = Math.abs(sum - K);
      }

      if (sum > K) {
        //합이 목표치보다 작음
        right = mid - 1;
      } else {
        //합이 목표치보다 큼
        left = mid + 1;
      }
    }
  }

  console.log(result);
}
