/**
 * 문제설명
 * 적록색약은 빨강과 초록을 느끼지 못한다. N*N에 rgb그림이있는데 구역 같은색으로 칠해져있음 상하좌우로 인접한곳은 같은 구역에 속함
 * 적록색약이 아닌 사람은빨파초지만 적록색약은빨초를 같이 봄
 * 아이디어
 * bfs돌리기
 * 시간복잡도
 */

const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);
// console.log('N: ', N);
const graph = [];
for (item of arr) {
  graph.push(item.split(''));
}

const visited_y = Array(N)
  .fill()
  .map(() => Array(N).fill(false));
const visited_n = Array(N)
  .fill()
  .map(() => Array(N).fill(false));
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
function bfs(y, x, visited, target, bool) {
  // console.log(y, x, bool);
  const dq = [];
  dq.push([y, x]);

  while (dq.length > 0) {
    const [py, px] = dq.pop();

    for (let i = 0; i < 4; i++) {
      const ny = py + dy[i];
      const nx = px + dx[i];

      if (ç && visited[ny][nx] === false) {
        if (bool) {
          if (target === 'B') {
            if (graph[ny][nx] === target) {
              visited[ny][nx] = true;
              dq.push([ny, nx]);
            }
          } else {
            if (graph[ny][nx] === 'R' || graph[ny][nx] === 'G') {
              visited[ny][nx] = true;
              dq.push([ny, nx]);
            }
          }
        } else {
          if (graph[ny][nx] === target) {
            visited[ny][nx] = true;
            dq.push([ny, nx]);
          }
        }
      }
    }
  }
  return 1;
}
let n_r = 0;
let y_r = 0;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (visited_n[y][x] === false) {
      visited_n[y][x] = true;
      n_r += bfs(y, x, visited_n, graph[y][x], false);
    }
    if (visited_y[y][x] === false) {
      visited_y[y][x] = true;
      y_r += bfs(y, x, visited_y, graph[y][x], true);
    }
  }
}

console.log(n_r, y_r);
