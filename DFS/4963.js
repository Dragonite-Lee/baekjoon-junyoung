/**
 * 문제설명
 * 섬과 바다가 지도에 주어지는데, 가로 세로 대각선은 걸어갈 수 있는 사각형이다.
 * 1은 땅 0은 바단데 섬의 개수 출력하기
 * 걸어서 갈수있으면 같은 섬
 * 아이디어
 *
 * 시간복잡도
 *
 */
const fs = require("fs");
const arr = fs.readFileSync("./input.txt").toString().trim().split("\n");
let index = 0;
const dx = [1, 0, -1, 0, 1, 1, -1, -1];
const dy = [0, 1, 0, -1, 1, -1, 1, -1];
while (true) {
  const [x, y] = arr[index].split(" ").map(Number);
  if (x === 0 && y === 0) {
    break;
  }
  index += 1;
  const graph = [];

  for (let i = 0; i < y; i++) {
    graph.push(arr[i + index].split(" ").map(Number));
  }
  index += y;

  const visited = Array(y)
    .fill()
    .map(() => Array(x).fill(false));

  function dfs(sy, sx) {
    visited[sy][sx] = true;
    for (let i = 0; i < 8; i++) {
      const ny = sy + dy[i];
      const nx = sx + dx[i];

      if (0 <= ny && ny < y && 0 <= nx && nx < x) {
        if (visited[ny][nx] === false && graph[ny][nx] === 1) {
          dfs(ny, nx);
        }
      }
    }
    return;
  }
  let result = 0;
  for (let h = 0; h < y; h++) {
    for (let w = 0; w < x; w++) {
      if (graph[h][w] === 1 && visited[h][w] === false) {
        dfs(h, w);
        result += 1;
      }
    }
  }
  console.log(result);
}
