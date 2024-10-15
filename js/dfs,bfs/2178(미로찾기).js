/*
1. 문제설명
- 1은 갈수 있는 곳 0은 못가는 곳
- 최단경로 거리구하기!
2. 아이디어
- bfs이용하기
- 1면 값 1씩 증가
3. 시간복잡도
- N,M이 100까지라 가능
*/
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

var [N, M] = input.split(' ').map(Number);
var map = []
for (item of arr) {
  map.push(item.split('').map(Number))
}

var dx = [1, 0, -1, 0]
var dy = [0, 1, 0, -1]

function bfs(y, x) {
  dq = [[y, x]]

  while (dq.length > 0) {
    [ey, ex] = dq.shift()
    
    for (let i = 0; i < 4; i++) {
      nx = ex + dx[i]
      ny = ey + dy[i]

      if (0 <= nx && nx < M && 0 <= ny && ny < N) {
        if (map[ny][nx] === 1) {
          map[ny][nx] = map[ey][ex] + 1
          dq.push([ny,nx])
        }
      }
    }
  }
}
bfs(0,0)
console.log(map[N-1][M-1])