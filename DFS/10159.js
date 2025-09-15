/**
 * 문제설명
 * 서로 다른 N개의 물건이 있음. 1~N 어떤게 무거운지 결과표 가지고있음
 * 비교결과를 알수없는 물건의 개수 출력하기
 * 아이디어
 * a,b로 잡고 b를 부모라고 잡은 후 그래프를 그리고 이동하면서 갯수세기
 *
 * dfs방법 이용
 * 시간복잡도
 *
 */

const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);

const M = Number(arr[0]);
const parent = Array.from({ length: N + 1 }, () => []);
const child = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i <= M; i++) {
  const [a, b] = arr[i].split(" ").map(Number);
  parent[a].push(b);
  child[b].push(a);
}

function dfs(start, visited, arr) {
  visited[start] = true;

  if (arr[start].length === 0) {
    return;
  }

  for (next of arr[start]) {
    if (visited[next] === false) {
      dfs(next, visited, arr);
    }
  }

  return;
}

for (let i = 1; i <= N; i++) {
  const visited = Array(N + 1).fill(false);

  dfs(i, visited, parent);
  dfs(i, visited, child);
  let result = 0;
  //   console.log("visited: ", visited);
  for (let j = 1; j <= N; j++) {
    if (visited[j] === true) {
      result += 1;
    }
  }
  console.log(N - result);
}
