/*
1. 문제설명
- 붙어있으면 힘이 제곱이 됨 
- 그래프를 탐색하면서 아군과 적군의 힘 구하기
2. 아이디어
- bfs돌면서 나온 값을 아군과 적군에 각자 저장
3. 시간복잡도
- V는 100*100 E는 100*100*4 O(V+E)는 2억미만
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

var [N, M] = input.split(' ').map(Number);
// console.log(N,M)
// console.log(arr)
var map = []
for (item of arr) {
  map.push(item.split(''))
}
// console.log(map)
var visited = Array(M)
  .fill()
  .map(() => Array(N).fill(false));
// console.log(visited)
var our_score = 0
var enemy_score = 0

function bfs(y,x, now) {
  const dx = [1, 0, -1, 0]
  const dy = [0, 1, 0, -1]
  var score = 0
  var dq = [[y,x]]

  while (dq.length > 0) {
    [ny,nx] = dq.pop()
    // console.log(ny, nx)
    score += 1
    for (let i = 0; i < 4; i++) {
      ex = dx[i] + nx
      ey = dy[i] + ny

      if (0 <= ex && ex < N && 0 <= ey && ey < M) {
        if (map[ey][ex] === now && visited[ey][ex] === false) {
          // console.log(ey,ex)
          visited[ey][ex] = true
          dq.push([ey, ex])
        }
      }
    }
  }
  // console.log(score)
  return score * score
}

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 'W' && visited[i][j] === false) {
      visited[i][j] = true
      our_score += bfs(i, j, 'W')
      // console.log(bfs(i, j, 'W'))
    } else if (map[i][j] === 'B' && visited[i][j] === false){
      visited[i][j] = true
      enemy_score += bfs(i, j, 'B')
      // console.log(bfs(i, j, 'B'))
    }
  }
}

console.log(our_score, enemy_score)