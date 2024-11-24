/**
 * 문제설명
 * 트리는 사이클이 없는 무방향 그래프이다.
 * 트리는 어떤 두 노드를 선택해도 둘 사이에 경로가 항상 하나만 존재하게 된다.
 * 트리에서 어떤 두 노드를 선택해서 양쪽으로 쫙 당길때 가장 길게 늘어나는 경우가 있을건데, 모든 노드들은 지름의 끝점으로 하는 원안에 들어간다.
 * 이걸 트리의 지름이라고 한다.
 * 아이디어
 * 젤 길려면..?? 일단 젤 하위 노드여야 함
 * 시작부터 젤 먼걸 하나찾고 해당 노드부터 다시 젤 먼걸 찾기
 * 한번 진행하면서 최대거리보다 더 긴게 있어? 그럼 갱신
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input);
const graph = Array.from({ length: n + 1 }, () => []);

for (item of arr) {
  const [a, b, c] = item.split(' ').map(Number);
  graph[b].push([a, c]);
  graph[a].push([b, c]);
}
// console.log(graph);
const visited = Array(n + 1).fill(false);
let max = {
  node: 0,
  dis: 0,
};

function dfs(node, dis) {
  visited[node] = true;
  if (max.dis < dis) max = { node, dis };

  for (const [next_node, next_dis] of graph[node]) {
    if (visited[next_node]) continue;

    dfs(next_node, dis + next_dis);
  }
}
dfs(1, 0);
// console.log(max);
visited.fill(false);
dfs(max.node, 0);
console.log(max.dis);
