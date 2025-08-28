/**
 * 문제설명
 * N*M격자로 이루어짐 -> 산봉우리마다 경비원 배치
 * 이를 위해 산봉우리가 몇갠지 세려고 함
 * 산봉우리는 같은높이를 가지는 하나의격자 혹은 그것의집합인데, 인접이란 x,y좌표 차이가 1이하인 경우
 * 또한 인접격자는 산봉우리보다 작아야함
 * 아이디어
 * 포문을 돌면서 상하좌우가 자기보다 같거나 큰애가
 * 시간복잡도
 *
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
const map = arr.map((v) => v.split(' ').map(Number));
// console.log('map: ', map);
const visited = Array.from({ length: N }, () => Array(M).fill(false));

const dx = [1, 0, -1, 0, 1, 1, -1, -1];
const dy = [0, 1, 0, -1, 1, -1, 1, -1];

let result = 0;
let trigger = true;
function bfs(y, x) {
  const dq = new Deque();
  dq.push([y, x]);

  while (dq.length > 0) {
    const [py, px] = dq.popleft();
    visited[py][px] = true;

    for (let i = 0; i < 8; i++) {
      const ny = py + dy[i];
      const nx = px + dx[i];

      if (0 <= nx && nx < M && 0 <= ny && ny < N) {
        if (visited[ny][nx] === false && map[ny][nx] === map[py][px]) {
          dq.push([ny, nx]);
        }
        if (map[ny][nx] > map[py][px]) {
          // console.log('ny, nx: ', ny, nx);
          trigger = false;
          // console.log('trigger: ', trigger);
        }
      }
    }
  }
}

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (visited[y][x] === false && map[y][x] > 0) {
      trigger = true;
      bfs(y, x, trigger);

      if (trigger) {
        // console.log('y, x: ', y, x);
        result++;
        // console.log('result: ', result);
      }
    }
  }
}
console.log(result);
