/**
 * 문제 설명
 * 트리가 입력으로 주어짐 먼저, 첫 번째 줄에는 트리의 정점의 개수 V가 주어지고,
 * 둘째줄부터 간선의 정보가 주어짐 정점번호는 1부터 V
 * 정점 번호가 주어지고 간선의 정보를 의미하는 정수가 2개씩 주어짐 두번째 정수와 거리가 몇으로 이루어짐
 * 아이디어
 * 트리지름 구하기 두점중 가장 긴것
 * 루트에서 시작해서 젤 멀리가는거 체크후 거기서 다시 시작해서 젤멀리가는거 체크
 * 시간복잡도
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const V = Number(input);
const graph = Array.from({ length: V + 1 }, () => []);

for (item of arr) {
  const item_arr = item.split(' ').map(Number);
  const start = item_arr[0];
  let end = [];
  let weight = [];
  for (let i = 1; i < item_arr.length - 1; i++) {
    if (i % 2 === 0) {
      weight.push(item_arr[i]);
    } else {
      end.push(item_arr[i]);
    }
  }
  // console.log(end, weight);
  for (let i = 0; i < end.length; i++) {
    graph[start].push([end[i], weight[i]]);
  }
}
// console.log(graph);
const visited = Array(V + 1).fill(false);
let max_value = {
  node: 0,
  dist: 0,
};
function dfs(node, dist) {
  visited[node] = true;
  if (max_value.dist < dist) {
    max_value = { node, dist };
  }
  
  // console.log(node);
  for (const [next_s, next_d] of graph[node]) {
    // console.log('next_s: ', next_s,visited[next_s]);
    if (visited[next_s]) continue;
    dfs(next_s, dist + next_d);
  }
}
dfs(1, 0);
visited.fill(false);
dfs(max_value.node, 0);
console.log(max_value.dist);
