/**
 * 문제설명
 * 심해에는 두 종류의 생명체 A와 B가 존재.
 * A는 B를 먹는데, 자기보다 크기가 작은 먹이만 먹을 수 있다.
 * A의 크기가 B보다 큰 쌍이 몇개나 있는지 구해라
 * 아이디어
 * 이진탐색 문제
 * 이진탐색은 정렬을 이용해 탐색 범위를 절반씩 줄이는 알고리즘
 * b를 정렬하고 a를 하나씩 넣어서 큰쌍의 개수를 구하기
 *
 * 시간복잡도
 * nlogn n번 반복하고, logn만큼 탐색
 * b를 정렬하고 nlogn + a만큼 b를 탐색 따라서 2nlogn -> nlogn
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input);

function binarySearch(start, end, target, array) {
  if (start === end) {
    if (array[end] < target) {
      return end + 1;
    } else {
      return end;
    }
  }

  const mid = Math.floor((start + end) / 2);

  if (array[mid] < target) {
    return binarySearch(mid + 1, end, target, array);
  } else {
    return binarySearch(start, mid, target, array);
  }
}

let round = 0;

while (round < T) {
  const [A, B] = arr[round * 3].split(" ").map(Number);
  const A_arr = arr[round * 3 + 1].split(" ").map(Number);
  const B_arr = arr[round * 3 + 2]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  let result = 0;
  for (item of A_arr) {
    result += binarySearch(0, B_arr.length - 1, item, B_arr);
    // console.log("result: ", result);
  }
  console.log(result);
  round++;
}
