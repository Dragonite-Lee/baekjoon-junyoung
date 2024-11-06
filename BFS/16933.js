/**
 * 문제설명
 * N*M의 행렬로 표현되는 맵 0은 이동할 수 있는 곳, 1은 벽
 * (1,1)에서 (N,M)으로 가려는데 최단경로로 가려고 함 이때 시작하는 칸과 끝나는 칸도 포함
 * 이동하지 않고 머무는 경우도 갯수 늘어남
 * 낮과 밤이 존재하는데, 가장 처음에 이동할 땐 낮이고, 한번 이동할 때마다 낮과 밤에 바뀜, 머무르는날에도 바뀜
 * 벽을 부수구 이동하는 경우도 있는데, 낮에만 부술 수 있음,
 * 아이디어
 * 일단 dfs이용
 * 매순간 할수있는 선택지 이동한다(0이라), 1이라 낮이라 벽을 부순다(K가 소진되지 않았을 때), 1이라 밤이라 기다린다(K가 소진되지 않았을 때)
 * 시간복잡도
 *
 */
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }
}

const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split('\n');

const [N, M, K] = input.shift().split(' ').map(Number);
const graph = input.map((v) => v.split(''));

let visited = Array.from(Array(N), () =>
  Array.from(Array(M), () => Array(K + 1).fill(false))
);

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
visited[0][0][0] = true;
const dq = new Queue();
dq.push([0, 0, 0, 1, true]); //행, 열, 벽부순횟수, 낮이자 시작거리

while (dq.length > 0) {
  const [y, x, z, ans, isDay] = dq.pop();
  if (y === N - 1 && x === M - 1) {
    process.exit(console.log(ans));
  }

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;

    if (graph[ny][nx] === '0' && visited[ny][nx][z] === false) {
      visited[ny][nx][z] = true;
      dq.push([ny, nx, z, ans + 1, !isDay]);
    } else if (
      graph[ny][nx] === '1' &&
      z < K &&
      visited[ny][nx][z + 1] === false
    ) {
      if (isDay) {
        visited[ny][nx][z + 1] = true;
        dq.push([ny, nx, z + 1, ans + 1, !isDay]);
      } else {
        dq.push([y, x, z, ans + 1, !isDay]);
      }
    }
  }
}
console.log(-1);
