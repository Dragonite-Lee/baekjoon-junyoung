/**
 * 문제설명
 * 흙으로 된 길에 폭우가 내려서 N(1~10,000)개의 물웅덩이가 생김
 * 길이가 L(1~1,000,000)인 널판지를 가지고 있음
 * 그래서 모두 덮으려고 하는데 덮는데 드는 널빤지의 최소 개수 구하기
 *
 * 아이디어
 * 일단 시작점 기준으로 정렬해 일렬로 만들기
 * 젤 앞에점부터 널판지를 길이대로 붙임
 * 대신 널판지가 다음 구멍까지 같이 덮이는 경우를 고려
 * 시간복잡도
 * N *
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, L] = input.split(" ").map(Number);
const graph = [];
for (item of arr) {
  graph.push(item.split(" ").map(Number));
}

graph.sort((a, b) => a[0] - b[0]);
let now = 0;
let result = 0;
for (item of graph) {
  const [start, end] = item;
  //   console.log("start, end: ", start, end);
  //   console.log(start, now);
  let new_start = start <= now ? now + 1 : start;
  while (new_start <= end - 1) {
    new_start += L;
    // console.log("new_start: ", new_start);
    now = new_start - 1;
    // console.log("now: ", now);

    result += 1;
  }
}
console.log(result);
