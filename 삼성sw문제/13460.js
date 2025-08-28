/**
 * 삼성sw문제 구슬 탈출 2
 * 문제설명
 * 직사각형 보드에 빨간 구슬 파란 구슬 넣고 빨간 구슬을 빼내려함
 * 보드는 세로 N 가로 M 크기임 가장 바깥 행과 열은 모두 막혀있고, 구멍이 하나 있음
 * 상하좌우로 기울이기가 가능함
 * 동시에 구멍에 빠져도 실패임 최소 몇번만에 빼느지 구하기
 * .은 빈칸 #은 벽 O은 구멍 r은 빨강 b는 파랑
 * 10번만에 못빼면 -1출력
 * 아이디어
 * r과 b의 위치를 찾고 각각 위치를 [0,0,1,1] 이런식으로 넣고
 * 한 행동마다 각자 움직이게 됨
 * 각각따로 visited를 검사하고
 * 움직이는 방향쪽으로 구멍이 있으면 안됨
 * 움직이는게 i = 0,2일 때, 좌표의 1,3 이 같을 때
 * 움직이는게 i = 1,3일 때, 좌표의 0,2 이 같을 때 는 안됨
 *
1. R,B,O의 좌표를 처음 가지고 시작

2. 큐를 활용하여 bfs 탐색 (상하좌우)

3. B가 O위치에 있다면 탐색을 넘어가서 다음 큐를 검사하고, R이 O위치에 있다면 종료

4. 상하좌우를 검색하면서 #이 아니면 큐에 추가

5. 11번 이상 검색시 종료
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
  graph.push(item.split(''));
}
let now_r = [];
let now_b = [];
let hole = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (graph[y][x] === 'R') {
      now_r.push(y, x);
    }
    if (graph[y][x] === 'B') {
      now_b.push(y, x);
    }
    if (graph[y][x] === 'O') {
      hole.push(y, x);
    }
  }
}

const dq = new Deque();

dq.push([...now_r, ...now_b, 0]);
const visited = Array(N)
  .fill()
  .map(() =>
    Array(M)
      .fill()
      .map(() =>
        Array(N)
          .fill()
          .map(() => Array(M).fill(false))
      )
  );

visited[now_r[0]][now_r[1]][now_b[0]][now_b[1]] = true;
let result = 0;
let find = false;
while (dq.length > 0) {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  const [ry, rx, by, bx, cnt] = dq.popleft();
  // console.log('ry, rx, by, bx: ', ry, rx, by, bx);
  // console.log(dq);
  result = cnt;
  if (cnt > 10) {
    break;
  }
  if (graph[ry][rx] === 'O') {
    find = true;
    break;
  }

  for (let i = 0; i < 4; i++) {
    let nry = ry;
    let nrx = rx;
    let nby = by;
    let nbx = bx;
    // 각 구슬을 true로 반복해서 벽만나면 한칸 뒤로 아니면 증가하게 만듬
    while (true) {
      nry += dy[i];
      nrx += dx[i];
      if (graph[nry][nrx] === '#') {
        nry -= dy[i];
        nrx -= dx[i];
        break;
      }
      if (graph[nry][nrx] === 'O') {
        break;
      }
    }
    while (true) {
      nby += dy[i];
      nbx += dx[i];
      if (graph[nby][nbx] === '#') {
        nby -= dy[i];
        nbx -= dx[i];
        break;
      }
      if (graph[nby][nbx] === 'O') {
        break;
      }
    }
    if (graph[nby][nbx] === 'O') {
      // 파랑이 먼저 들어가면 안됨
      continue;
    }
    if (nry === nby && nrx === nbx) {
      // x값이 같거나 y값이 같으면 들어가면 안됨 구슬의 위치가 같으면 더 많이 움직인애가 뒤에있는거니까 1뺌
      let r_move = Math.abs(nry - ry) + Math.abs(nrx - rx);
      let b_move = Math.abs(nby - by) + Math.abs(nbx - bx);
      if (r_move > b_move) {
        // r이 더 많이 움직였음
        nry -= dy[i];
        nrx -= dx[i];
      } else {
        // b가 더 많이 움직였음
        nby -= dy[i];
        nbx -= dx[i];
      }
    }
    // console.log('nry, nrx, nby, nbx: ', nry, nrx, nby, nbx);
    if (visited[nry][nrx][nby][nbx] === false) {
      // 둘 다 방문하지 않은 곳이라면
      dq.push([nry, nrx, nby, nbx, cnt + 1]);
      visited[nry][nrx][nby][nbx] = true;
    }
  }
}
// find
// console.log('find: ', find);
if (!find) {
  console.log(-1);
} else {
  if (result > 10) {
    console.log(-1);
  } else {
    console.log(result);
  }
}
