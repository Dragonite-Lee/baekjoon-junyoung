/*
bfs는 너비우선 탐색 큐를 이용해 인접노드 다 보고 다음 노드로 이동
dfs는 깊이우선 탐색 재귀를 이용해 제일 끝 노드까지 다 보고 이동
*/
const fs = require('fs');

const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M, V] = input.split(' ').map(Number);
const num_arr = arr.map((a) => a.split(' ').map(Number));
var map = Array(N + 1)
  .fill()
  .map(() => Array(N + 1).fill(false));
for (num of num_arr) {
  [a, b] = num;
  map[a][b] = true;
  map[b][a] = true;
}
// console.log(map)
// console.log(N,M,V)
var visited_bfs = Array(N + 1).fill(false);
// console.log('visited_bfs: ', visited_bfs);
var visited_dfs = Array(N + 1).fill(false);
//bfs
function bfs(start) {
  var result = [];
  var q = [start];
  visited_bfs[start] = true;
  while (q.length > 0) {
    start = q.shift();
    result.push(start);
    for (let i = 1; i < N + 1; i++) {
      if (map[start][i] === true && visited_bfs[i] === false) {
        visited_bfs[i] = true;
        q.push(i);
      }
    }
  }
  return result;
}

//dfs
function dfs(start, result) {
  visited_dfs[start] = true;
  result.push(start);

  for (let i = 1; i < N + 1; i++) {
    if (map[start][i] === true && visited_dfs[i] === false) {
      dfs(i, result);
    }
  }
}

var dfs_result = [];
dfs(V, dfs_result);
console.log(dfs_result.join(' '));
console.log(bfs(V).join(' '));
