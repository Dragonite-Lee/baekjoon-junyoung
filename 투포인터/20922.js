/**
 * 문제설명
 * 겹치는 것을 싫어함 특히, 수열에 같은 원소가 여러개 있는 것을 싫어함
 * 같은 원소가 K개 이하로 들어있는 최장연속 부분 수열의 길이를 구하려고 함
 * 아이디어
 * 배열의 길이인 N이 200,000 이므로 2중포문은 안됨
 * left right를 두고 돌건데 첫번째와두번째는 map에 넣어놓고
 * 새로나오는것의 map의 값이 K이하면 right 움직이고 아니면 left움직이면서 길이 체크
 * 만약 left right
 * 시간복잡도
 * 정렬없이 투포인터라 O(N)
 */

const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input.split(" ").map(Number);
const graph = arr[0].split(" ").map(Number);

const dupe = new Map();

let left = 0;
let right = 0;
let result = 0;

while (left <= right && right < N) {
  const left_value = graph[left];
  const right_value = graph[right];

  // 아직 수열에 해당 수를 넣을 수 있는 상태
  if (!dupe.has(right_value)) {
    right++;
    dupe.set(right_value, 1);
  } else {
    if (dupe.get(right_value) < K) {
      right++;
      dupe.set(right_value, dupe.get(right_value) + 1);
    } else {
      left++;
      if (dupe.get(left_value) !== 0) {
        dupe.set(left_value, dupe.get(left_value) - 1);
      }
    }
  }
  result = Math.max(result, right - left);
}
console.log(result);
