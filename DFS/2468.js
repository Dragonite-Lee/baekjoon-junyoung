/**
 * 문제설명
 * 지역의 높이 정보를 파악하고 비가 내렸을 때 물에 잠기지 않는 안전한 영역이 최대로 몇개가만들어지는지 조사
 * 일정 높이 이하는 모두 물에 잠김
 * 안전영역은 인접해있는것들의 수
 * 비가 내리는 모든 경우를 다 조사했을때 최대개수를 구하기
 * 아이디어
 * 비의 높이를 1부터 시작
 * 그래프를 돌면서 가라앉는지 아닌지 bfs로 방문과 비의높이기준으로 갯수세기
 * 비의높이를 갱신할때 최대값갱신
 * 만약 갯수가 0이면 스탑
 * 시간복잡도
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);
let graph = [];
for (a of arr) {
  graph.push(a.split(' ').map(Number));
}

function bfs(y, x, h, visit, map) {
  let dy = [0, 1, 0, -1];
  let dx = [1, 0, -1, 0];

  let qu = [];
  qu.push([y, x]);

  while (qu.length > 0) {
    [y, x] = qu.shift();
    // console.log('y, x: ', y, x, h);
    for (let i = 0; i < 4; i++) {
      let ny = dy[i] + y;
      let nx = dx[i] + x;

      if (0 <= ny && ny < N && 0 <= nx && nx < N) {
        if (visit[ny][nx] === false && map[ny][nx] > h) {
          visit[ny][nx] = true;
          qu.push([ny, nx]);
        }
      }
    }
  }
  return 1;
}
let max_cnt = 1;
let rainy = 0;

  
while (rainy <= 100) {
  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  // console.log('visited: ', visited);

  let cnt = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (graph[y][x] > rainy && visited[y][x] === false) {
        visited[y][x] = true;
        // console.log(y,x,rainy)
        cnt += bfs(y, x, rainy, visited, graph);
        // console.log(visited);
      }
    }
  }
  // console.log('cnt: ', cnt);
  if (cnt === 0) {
    break;
  }
  max_cnt = Math.max(cnt, max_cnt);
  rainy += 1;
}
console.log(max_cnt);
