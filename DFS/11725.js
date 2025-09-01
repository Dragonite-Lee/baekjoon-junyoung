/**
 * 문제설명
 * 루트가 없는 트리가 주어진다. 이때, 트리의 루트를 1이라고 정했을때 각 노드의 부모를 구해라
 * 첫째줄에 노드의 개수 2, 100,000이 주어지고 둘째부터 연결된 두 정점이 주어진다.
 *
 * 아이디어
 * DFS란? 깊이우선 탐색 -> 보통 스택이나 재귀를 이용해 구현
 * 1번이 루트노드가 확정이 되면 1번에서 이어진것들을 쭉 타고 내려가면서 부모를 기록
 * 1번부터 시작해 재귀를 이용해 탐색
 *
 * 시간복잡도
 * 재귀인 경우 보통 O(V+E) -> 트리의 경우 n^2에서 nlogn으로 줄어듬
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);
const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array(N + 1).fill(false);
for (item of arr) {
  const [a, b] = item.split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}
// console.log(graph);

const solution = Array(N + 1).fill(0);
function dfs(v) {
  visited[v] = true;
  for (const next of graph[v]) {
    if (visited[next] === false) {
      solution[next] = v;
      dfs(next);
    }
  }
}

dfs(1);
console.log(solution.slice(2).join("\n"));
