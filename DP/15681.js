/**
 * 15681 트리와 쿼리
 * 문제설명
 * 간선에 가중치와 방향성이 없는 임의의 루트 있는 트리가 주어짐
 * 정점 U를 루트로 하는 서브트리에 속한 정점의 수를 출력
 * 사이클이란 어떤 간선도 두번이상방문하지않고 시작점으로 돌아오는 것
 * 아이디어
 * 각각 100,000
 * dfs로 간선에대한 dp를 제작하가 루트값이 정해졌으니까
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, R, Q] = input.split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [a, b] = arr[i].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}
const query = [];

for (let i = 0; i < Q; i++) {
  query.push(Number(arr[N - 1 + i]));
}
// console.log('query: ', query);
const dp = Array(N + 1).fill(1);
const visited = Array(N + 1).fill(false);
function dfs(st) {
  visited[st] = true;
  for (const next of graph[st]) {
    if (visited[next] === false) {
      dp[st] += dfs(next);
    }
  }

  return dp[st];
}

dfs(R);

for (item of query) {
  console.log(dp[item]);
}
