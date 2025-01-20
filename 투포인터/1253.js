/**
 * 문제설명
 * N개의 수 중에서 어떤 수가 다른 수 두개의 합으로 나타낼 수 있다면 그 수를 좋다라고 한다
 * N개의 수 중 좋은 수의 개수는 몇 개인지 출력
 * 수의 위치가 다르면 값이 같아도 다른 수이다.
 * 아이디어
 * N은 1부터 2000
 * 이중포문으로 set에 다넣고 검사해볼까?? -> 안됨
 * for문을호 한개씩 타겟
 * 이분탐색시작 시작과 끝으로 타겟보다 더한게 작으면 left를 올리고 더한게 크면 right를 올림
 * 시간복잡도
 *  NlogN
 */

const fs = require("fs");
const [input, arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);
// console.log(arr)
const num_arr = arr.split(" ").map(Number);
// console.log("num_arr: ", num_arr);
// 12 13 14 15 16 17 18 19
// 23 24 25 26 27 28 29
// 1 2 3 4 5 6 7 8 9 10s

// 1 10 11 이게 자기 자신의 위치를 제외한 수보다 크면?
num_arr.sort((a, b) => a - b);
let result = 0;

for (let i = 0; i < N; i++) {
  let goal = num_arr[i];

  let left = 0;
  let right = num_arr.length - 1;

  while (left < right) {
    let sum = num_arr[left] + num_arr[right];
    if (goal > sum) {
      left += 1;
    } else if (goal < sum) {
      right -= 1;
    } else if (goal === sum) {
      if (left === i) {
        left += 1;
      } else if (right === i) {
        right -= 1;
      } else {
        result += 1;
        break;
      }
    }
  }
}

console.log(result);
