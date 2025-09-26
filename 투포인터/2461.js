/**
 * 문제설명
 * N개의 학급이 있고, 각 학급에는 M명이 존재
 * 체육대회에 새로운 종목의 경기를 추가했다.
 * 선발된 학생들의 능력치 중 최대와 최소 차이가 최소가 되도록 선수를 선발하려고 함
 * 각 학급에서 뽑은 사람들의 최대 최소의 차이가 최소가 되게!!
 * 아이디어
 * 전체를 보긴 할건데 인덱스를 학급 수 만큼 만들고 최소인 인덱스를 올리면서 갱신해주기
 * 시간복잡도
 *
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input.split(" ").map(Number);
const grade = [];
for (item of arr) {
  grade.push(
    item
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b)
  );
}

const grade_index = Array(N).fill(0);
let result = 1000000001;
while (true) {
  let min_value = 1000000001;
  let max_value = -1;
  let min_index = -1;
  for (let i = 0; i < N; i++) {
    const [value, index] = [grade[i][grade_index[i]], i];
    if (min_value > value) {
      min_value = value;
      min_index = index;
    }
    if (max_value < value) {
      max_value = value;
    }
  }

  if (result > max_value - min_value) {
    result = max_value - min_value;
  }
  grade_index[min_index] += 1;
  if (grade_index[min_index] >= M) {
    break;
  }
}

console.log(result);
