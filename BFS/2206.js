/**
 * 2206 벽부수고 이동하기 bfs
 * 문제설명
 * N*M 행렬에서 0은 이동할 수 있는 곳 1은 벽
 * 1,1 에서 N,M으로 가는 최단경로 이때 시작하는 칸과 끝나는 칸도 포함하여 셈
 * 벽을 한개까진 부수고 이동해도 괜찮음
 * 시작과 끝은 항상 0이고 못가면 -1 출력
 * 아이디어
 * N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 1,000)
 * bfs로 구현하기
 * 큐에 true false로 현재 벽을 뚫을 수 있는 상태인지 같이 넣기
 * true면 벽 하나 뚫을 수 있음
 * 시간복잡도
 */

class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }
  append(item) {
    if (this.arr[0]) {
      for (let i = this.arr.length; i > 0; i--) {
        this.arr[i] = this.arr[i - 1];
      }
    }
    this.arr[this.head] = item;
    this.tail++;
    this.length++;
  }
  push(item) {
    this.arr[this.tail++] = item;
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
  pop() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[--this.tail];
      this.length--;
      return result;
    }
  }
}

const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input.split(' ').map(Number);
const graph = [];
for (item of arr) {
  graph.push(item.split('').map(Number));
}
const visited = Array(N)
  .fill()
  .map(() =>
    Array(M)
      .fill()
      .map(() => Array(2).fill(false))
  );

// 0,0 출발 N-1, M-1 도착 방문에서 세번째 0은 뚫기가능 1은 불가능
let result = 1000001;
let find = false;
const dq = new Deque();
dq.push([0, 0, 0, 1]);
visited[0][0][0] = true;
while (dq.length > 0) {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  const [ny, nx, chance, cnt] = dq.popleft();
  // console.log('ny, nx, chance, cnt: ', ny, nx, chance, cnt);
  if (ny === N - 1 && nx === M - 1) {
    result = Math.min(result, cnt);
    find = true;
    break;
  }

  for (let i = 0; i < 4; i++) {
    const ey = ny + dy[i];
    const ex = nx + dx[i];
    if (0 <= ey && ey < N && 0 <= ex && ex < M) {
      if (visited[ey][ex][chance] === false) {
        visited[ey][ex][chance] = true;
        if (graph[ey][ex] === 0) {
          if (chance === 0) {
            dq.push([ey, ex, 0, cnt + 1]);
          } else {
            dq.push([ey, ex, 1, cnt + 1]);
          }
        } else if (graph[ey][ex] === 1 && chance === 0) {
          dq.push([ey, ex, 1, cnt + 1]);
        }
      }
    }
  }
}

if (find) {
  console.log(result);
} else {
  console.log(-1);
}
