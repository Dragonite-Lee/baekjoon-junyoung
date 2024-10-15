/*
1. 문제설명
- 그래프돌고 총 단지 수와 단지내 집 수 출력
2. 아이디어
- bfs돌면서 돌때 갯수 세서 배열에 넣기
3. 시간복잡도
- bfs는 V+E 인데 V = 625 E = 625*4 이므로 100만정도
 */

const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');
const N = Number(input);
// console.log(arr)
graph = [];
for (let i = 0; i < N; i++) {
  graph[i] = arr[i].split('').map(Number);
}
var visited = Array(N)
  .fill()
  .map(() => Array(N).fill(false));
// console.log('visited: ', visited);
result = [];
dx = [1, 0, -1, 0];
dy = [0, 1, 0, -1];

function bfs(y, x, graph, visited) {
  var dq = [[y, x]];
  // console.log('dq: ', dq);
  var cnt = 1;
  while (dq.length > 0) {
    // console.log(dq.pop())
    var [ey, ex] = dq.pop();
    // console.log(ey, ex)
    for (let i = 0; i < 4; i++) {
      ny = ey + dy[i];
      nx = ex + dx[i];
      if (0 <= nx && nx < N && 0 <= ny && ny < N) {
        if (graph[ny][nx] == 1 && visited[ny][nx] === false) {
          cnt += 1;
          visited[ny][nx] = true;
          dq.push([ny, nx]);
        }
      }
    }
  }
  return cnt;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (graph[i][j] === 1 && visited[i][j] === false) {
      visited[i][j] = true;
      val = bfs(i, j, graph, visited);
      result.push(val);
      // console.log(bfs(i, j, graph, visited));
    }
  }
}
console.log(result.length);
result.sort((a, b) => a - b);
for (i of result) {
  console.log(i);
}
