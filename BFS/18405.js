/**
 * 문제설명
 * N*N크기의 시험관이 존재. 해당 시험관에는 특정 위치에 바이러스가 존재할 수 있다.
 * 각 바이러스는 1 ~ K의 종류중 하나에 속한다
 * 1초마다 상하좌우중 증식하는데 번호가 낮은 종류의 바이러스부터 증식한다.
 * S초가 지난 후, xy에 존재하는 바이러스의 종류 출력 없으면 0. 출력
 * 아이디어
 * N은 200 K는 1000 S는 10000
 * 이중포문 돌아서 map에 번호별로 정리하고 번호 순서대로 큐에넣어서 bfs진행하고 그래프에 적용
 * 시간복잡도
 * n^2 는 40,00
 */
class Deque {
  constructor() {
    this.arr = [];
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  }
  push(value) {
    this.arr[this.tail++] = value;
    this.length++;
  }
  popleft() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[this.head++];
      this.length--;
      return result;
    }
  }
}
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input.split(" ").map(Number);
const graph = [];
for (let i = 0; i < N; i++) {
  graph.push(arr[i].split(" ").map(Number));
}
const [S, ox, oy] = arr[N].split(" ").map(Number);
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
const visited = Array(N)
  .fill()
  .map(() => Array(N).fill(0));

const dq = new Deque();
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (graph[y][x] !== 0) {
      dq.push([graph[y][x], y, x, 0]);
      visited[y][x] = -5;
    }
  }
}

while (dq.length > 0) {
  const [i, py, px, index] = dq.popleft();
  if (index === S) {
    break;
  }
  for (let j = 0; j < 4; j++) {
    const ny = py + dy[j];
    const nx = px + dx[j];

    if (0 <= ny && ny < N && 0 <= nx && nx < N) {
      if (visited[ny][nx] === index || visited[ny][nx] === 0) {
        if (graph[ny][nx] === 0) {
          graph[ny][nx] = i;
          dq.push([graph[ny][nx], ny, nx, index + 1]);
          visited[ny][nx] = index;
        } else {
          if (graph[ny][nx] > i) {
            graph[ny][nx] = i;
            dq.push([graph[ny][nx], ny, nx, index + 1]);
            visited[ny][nx] = index;
          }
        }
      }
    }
  }
}

console.log(graph[ox - 1][oy - 1]);
